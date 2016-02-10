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
      <form onChange={this.handleChange}>
        <div className="checkbox">{this.props.data.map(this.label)}</div>
      </form>
    );
  }
});

var Spinbox = React.createClass({
  value: function() {
    return this.refs.number.value;
  },
  handleChange: function(e) {
    this.props.app.setState(this.props.app.state);
  },
  render: function() {
    return (
      <form onChange={this.handleChange}>
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <input ref="number" id={this.props.name} className="form-control" type="number" step="10" defaultValue="100" />
      </form>
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
        var data = data.split('\n').map(row => row.split('\t'))
        this.state.headers = data[0];
        this.state.headers.splice(7, 0, 'Total');
        this.state.data = data.slice(1).map(row => {
          row[3] = parseInt(row[3]);
          row[4] = parseInt(row[4]);
          row[5] = parseInt(row[5]);
          row[6] = parseInt(row[6]);
          row.splice(7, 0, row[4] + row[5] + row[6]);
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
  sum: function(data, i) {
    return data.reduce((prev, current) => current[i] + prev, 0);
  },
  unit: function() {
    var all = this.state.data.map(row => {
      var row = row.slice(0);
      row[8] = row[8].split(' ');
      row[8][2] = parseInt(row[8][2]);
      return row;
    });
    var data = all.filter(row => this.refs.type.predicate(row[1]) && this.refs.rarity.predicate(row[2]));
    var unit = data.slice(0, 5);
    data.forEach(center => {
      var effect = (100 + center[8][2]) / 100;
      var calculate = function(row) {
        var row = row.slice(0);
        if (center[8][0] == 'Cute' && row[1] == 'Cu' || center[8][0] == 'Cool' && row[1] == 'Co' || center[8][0] == 'Passion' && row[1] == 'Pa') {
          switch (center[8][1]) {
          case 'Brilliance':
            row[4] *= effect * parseInt(this.refs.vocal.value()) / 100;
            row[5] *= effect * parseInt(this.refs.dance.value()) / 100;
            row[6] *= effect * parseInt(this.refs.visual.value()) / 100;
            break;
          case 'Voice':
            row[4] *= effect * parseInt(this.refs.vocal.value()) / 100;
            break;
          case 'Step':
            row[5] *= effect * parseInt(this.refs.dance.value()) / 100;
            break;
          case 'Makeup':
            row[6] *= effect * parseInt(this.refs.visual.value()) / 100;
            break;
          }
          row[4] = Math.ceil(row[4]);
          row[5] = Math.ceil(row[5]);
          row[6] = Math.ceil(row[6]);
          row[7] = row[4] + row[5] + row[6];
        }
        return row;
      }.bind(this);
      var newUnit = data.filter(row => row != center).map(calculate).sort((x, y) => y[7] - x[7]).slice(0, 4);
      newUnit.unshift(center);
      newUnit.push(all.map(calculate).sort((x, y) => y[7] - x[7])[0]);
      if (this.sum(newUnit, 7) > this.sum(unit, 7)) {
        unit = newUnit;
      }
    });
    return unit.map(row => {
      row[8] = row[8].join(' ');
      return row;
    });
  },
  headerColumn: function(col, i) {
    return <th key={i}>{col}<SortButton app={this} index={i} /></th>;
  },
  sumColumn: function(i) {
    if (i >= 3 && i < 8) {
      return <td key={i}>{this.unit().reduce(function(prev, current) { return current[i] + prev }, 0)}</td>;
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
            {this.unit().map(this.tableRow)}
            <tr>{this.state.headers.map((col, i) => this.sumColumn(i))}</tr>
          </tbody>
        </table>
        <Checkbox ref="type" app={this} data={['Cu', 'Co', 'Pa']} />
        <Checkbox ref="rarity" app={this} data={['N', 'R', 'SR', 'SSR']} />
        <Spinbox ref="vocal" name="Vocal" app={this} />
        <Spinbox ref="dance" name="Dance" app={this} />
        <Spinbox ref="visual" name="Visual" app={this} />
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
