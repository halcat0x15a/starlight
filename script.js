var SortButton = React.createClass({
  getInitialState: function() {
    return {order: 'sort'};
  },
  sort: function(compare) {
    var data = this.props.app.state.data;
    var key = this.props.index;
    for (var i = 1; i < data.length; i++) {
      var tmp = data[i];
      if (compare(data[i - 1][key], tmp[key])) {
        var j = i;
        do {
          data[j] = data[j - 1];
          --j;
        } while (j > 0 && compare(data[j - 1][key], tmp[key]));
        data[j] = tmp;
      }
    }
    this.props.app.setState(this.props.app.state);
  },
  onClick: function(e) {
    switch (this.state.order) {
    case 'sort':
      this.state.order = 'sort-by-order-alt';
      this.sort(function(x, y) { return x < y });
      break;
    case 'sort-by-order-alt':
      this.state.order = 'sort-by-order';
      this.sort(function(x, y) { return x > y });
      break;
    case 'sort-by-order':
      this.state.order = 'sort';
      this.props.app.loadData();
      break;
    }
    this.setState(this.state);
  },
  render: function() {
    return (
      <button type="button" className="btn btn-link" onClick={this.onClick}>
        <span className={"glyphicon glyphicon-" + this.state.order} aria-hidden="true"></span>
      </button>
    );
      
  }
});

var Checkbox = React.createClass({
  handleChange: function(e) {
    this.props.app.setState(this.props.app.state);
  },
  predicate: function(col) {
    return this.refs[col].checked;
  },
  label: function(value, i) {
    return (
      <label key={i} className="checkbox-inline"><input type="checkbox" ref={value} defaultChecked={true} />{value}</label>
    );
  },
  render: function() {
    return (
      <form onChange={this.handleChange}>{this.props.data.map(this.label)}</form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {headers: [], data: []};
  },
  loadData: function() {
    $.ajax({
      url: 'data.tsv',
      cache : false,
      success: function(data) {
        var work = data.split('\n').map(function(row) {
          return row.split('\t').map(function(col) {
            return /\d+/.test(col) ? parseInt(col) : col;
          });
        });
        this.state.headers = work[0];
        this.state.headers.push('Total');
        this.state.data = work.slice(1).map(function(row) {
          row.push(row[4] + row[5] + row[6]);
          return row;
        });
        this.setState(this.state);
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadData();
  },
  data: function() {
    return this.state.data.filter(row => this.refs.type.predicate(row[1]) && this.refs.rarity.predicate(row[2]));
  },
  members: function() {
    return this.data().sort((x, y) => y[7] - x[7]).slice(0, 5);
  },
  headerColumn: function(col, i) {
    return <th key={i}>{col}<SortButton app={this} index={i} /></th>;
  },
  sumColumn: function(i) {
    if (i >= 3) {
      return <td key={i}>{this.members().reduce(function(prev, current) { return current[i] + prev }, 0)}</td>;
    } else {
      return <td key={i}></td>;
    }
  },
  tableRow: function(row, i) {
    return <tr key={i}>{row.map(function(col, j) { return <td key={j}>{col}</td>; })}</tr>;
  },
  render: function() {
    return (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr>{this.state.headers.map(function(col, i) { return <th key={i}>{col}</th>; })}</tr>
          </thead>
          <tbody>
            {this.members().map(this.tableRow)}
            <tr>{this.state.headers.map((col, i) => this.sumColumn(i))}</tr>
          </tbody>
        </table>
        <Checkbox ref="type" app={this} data={['Cu', 'Co', 'Pa']} />
        <Checkbox ref="rarity" app={this} data={['N', 'R', 'SR', 'SSR']} />
        <table className="table table-striped">
          <thead>
            <tr>{this.state.headers.map(this.headerColumn)}</tr>
          </thead>
          <tbody>
            {this.data().map(this.tableRow)}
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
