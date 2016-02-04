var HEADERS = ['Name', 'Type', 'Rarity', 'Life', 'Vocal', 'Dance', 'Visual'];

function sort(data, compare) {
  for (var i = 1; i < data.length; i++) {
    var tmp = data[i];
    if (compare(data[i - 1], tmp)) {
      var j = i;
      do {
        data[j] = data[j - 1];
        --j;
      } while (j > 0 && compare(data[j - 1], tmp));
      data[j] = tmp;
    }
  }
  return data;
}

var App = React.createClass({
  getInitialState: function() {
    return {data: [], order: ['sort', 'sort', 'sort', 'sort', 'sort', 'sort', 'sort'], type: ['Cute', 'Cool', 'Passion'], rarity: ['N', 'R', 'SR', 'SSR']};
  },
  loadCSV: function() {
    $.ajax({
      url: 'data.tsv',
      cache : false,
      success: function(data) {
        this.state.data = data.split('\n').map(function(row) {
          return row.split('\t').map(function(col) {
            return /\d+/.test(col) ? parseInt(col) : col;
          });
        });
        console.log(this.state.data);
        this.setState(this.state);
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCSV();
  },
  onClick: function(i) {
    return function(e) {
      switch (this.state.order[i]) {
      case 'sort':
        this.state.order[i] = 'sort-by-order-alt';
        sort(this.state.data, function(x, y) { return x[i] < y[i]; });
        this.setState(this.state);
        break;
      case 'sort-by-order-alt':
        this.state.order[i] = 'sort-by-order';
        sort(this.state.data, function(x, y) { return x[i] > y[i]; });
        this.setState(this.state);
        break;
      case 'sort-by-order':
        this.state.order[i] = 'sort';
        this.loadCSV();
        break;
      }
    }.bind(this);
  },
  sortButton: function(i) {
    return <button type="button" className="btn btn-link" onClick={this.onClick(i)}><span className={"glyphicon glyphicon-" + this.state.order[i]} aria-hidden="true"></span></button>;
  },
  headerColumn: function(col, i) {
    return <th key={i}>{col}{this.sortButton(i)}</th>;
  },
  handleChange: function(e) {
    this.state.type = [].concat(
      this.refs.Cute.checked ? ['Cute'] : [],
      this.refs.Cool.checked ? ['Cool'] : [],
      this.refs.Passion.checked ? ['Passion'] : []
    );
    this.state.rarity = [].concat(
      this.refs.N.checked ? ['N'] : [],
      this.refs.R.checked ? ['R'] : [],
      this.refs.SR.checked ? ['SR'] : [],
      this.refs.SSR.checked ? ['SSR'] : []
    );
    this.setState(this.state);
  },
  tableRow: function(row, i) {
    return <tr key={i}>{row.map(function(col, j) { return <td key={j}>{col}</td>; })}</tr>;
  },
  checked: function(row) {
    return this.state.type.includes(row[1]) && this.state.rarity.includes(row[2]);
  },
  members: function() {
    return this.state.data.filter(this.checked).sort(function (x, y) { return (y[4] + y[5] + y[6]) - (x[4] + x[5] + x[6]) }).slice(0, 5);
  },
  sum: function(i) {
    return this.members().reduce(function(prev, current) { return current[i] + prev }, 0);
  },
  render: function() {
    return (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr>{HEADERS.map(function(col, i) { return <th key={i}>{col}</th>; })}</tr>
          </thead>
          <tbody>
            {this.members().map(this.tableRow)}
            <tr><td></td><td></td><td></td><td>{this.sum(3)}</td><td>{this.sum(4)}</td><td>{this.sum(5)}</td><td>{this.sum(6)}</td></tr>
          </tbody>
        </table>
        <form onChange={this.handleChange}>
          <label className="checkbox-inline"><input type="checkbox" ref="Cute" defaultChecked={true} />Cute</label>
          <label className="checkbox-inline"><input type="checkbox" ref="Cool" defaultChecked={true} />Cool</label>
          <label className="checkbox-inline"><input type="checkbox" ref="Passion" defaultChecked={true} />Passion</label>
          <label className="checkbox-inline"><input type="checkbox" ref="N" defaultChecked={true} />N</label>
          <label className="checkbox-inline"><input type="checkbox" ref="R" defaultChecked={true} />R</label>
          <label className="checkbox-inline"><input type="checkbox" ref="SR" defaultChecked={true} />SR</label>
          <label className="checkbox-inline"><input type="checkbox" ref="SSR" defaultChecked={true} />SSR</label>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>{HEADERS.map(this.headerColumn)}</tr>
          </thead>
          <tbody>
            {this.state.data.filter(this.checked).map(this.tableRow)}
          </tbody>
        </table>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
