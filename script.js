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
    return {data: [], order: ['sort', 'sort', 'sort', 'sort', 'sort', 'sort']};
  },
  loadCSV: function() {
    $.ajax({
      url: 'cute.csv',
      cache : false,
      success: function(data) {
        this.state.data = data.split('\n').map(function(row) { return row.split('\t'); });
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
  render: function() {
    return (
      <div className="container-fluid">
        <table className="table table-striped">
          <thead>
            <tr>{['Name', 'Rarity', 'Life', 'Vocal', 'Dance', 'Visual'].map(this.headerColumn)}</tr>
          </thead>
          <tbody>
            {this.state.data.slice(1).map(function(row, i) { return <tr key={i}>{row.map(function(col, j) { return <td key={j}>{col}</td>; })}</tr>; })}
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
