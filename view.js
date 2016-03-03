import * as model from "./model";
import React from 'react';
import ReactDOM from 'react-dom';

var SortButton = React.createClass({
  statics: {
    group: []
  },
  componentDidMount: function() {
    this.constructor.group.push(this);
  },
  getInitialState: function() {
    return {order: 'sort'};
  },
  onClick: function(e) {
    for (let button of this.constructor.group) {
      if (button != this) {
        button.setState({order: 'sort'});
      }
    }
    switch (this.state.order) {
    case 'sort':
      this.props.onClick(data => data.slice(0).sort((x, y) => this.props.by(y) - this.props.by(x)));
      this.setState({order: 'sort-by-order-alt'});
      break;
    case 'sort-by-order-alt':
      this.props.onClick(data => data.slice(0).sort((x, y) => this.props.by(x) - this.props.by(y)));
      this.setState({order: 'sort-by-order'});
      break;
    case 'sort-by-order':
      this.props.onClick(data => data);
      this.setState({order: 'sort'});
      break;
    }
  },
  render: function() {
    return (
      <a href="#" role="button">
        <span className={"glyphicon glyphicon-" + this.state.order} aria-hidden="true" onClick={this.onClick}></span>
      </a>
    );
  }
});

class IdolTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.data};
  }
  onClick(n) {
    return e => this.props.onClick(n);
  }
  onButtonClick(sort) {
    this.setState({data: sort(this.props.data)});
  }
  checkType(idol) {
    if (Object.keys(this.refs).length == 0)
      return true;
    else if (idol.isCute())
      return this.refs.cute.checked;
    else if (idol.isCool())
      return this.refs.cool.checked;
    else if (idol.isPassion())
      return this.refs.passion.checked;
  }
  checkRarity(idol) {
    if (Object.keys(this.refs).length == 0)
      return true;
    else if (idol.isNormal())
      return this.refs.normal.checked;
    else if (idol.isRare())
      return this.refs.rare.checked;
    else if (idol.isSRare())
      return this.refs.srare.checked;
    else if (idol.isSSRare())
      return this.refs.ssrare.checked;
  }
  handleChange(e) {
    this.forceUpdate();
  }
  data() {
    return this.state.data.filter(idol => this.checkType(idol) && this.checkRarity(idol));
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">アイドル一覧</div>
        <div className="panel-body">
          <form onChange={this.handleChange}>
            <label className="checkbox-inline"><input type="checkbox" ref="cute" defaultChecked={true} /> キュート</label>
            <label className="checkbox-inline"><input type="checkbox" ref="cool" defaultChecked={true} /> クール</label>
            <label className="checkbox-inline"><input type="checkbox" ref="passion" defaultChecked={true} /> パッション</label>
            <label className="checkbox-inline"><input type="checkbox" ref="normal" defaultChecked={true} /> ノーマル</label>
            <label className="checkbox-inline"><input type="checkbox" ref="rare" defaultChecked={true} /> レア</label>
            <label className="checkbox-inline"><input type="checkbox" ref="srare" defaultChecked={true} /> Sレア</label>
            <label className="checkbox-inline"><input type="checkbox" ref="ssrare" defaultChecked={true} /> SSレア</label>
          </form>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>アイドル</th>
              <th>タイプ</th>
              <th>レア度</th>
              <th>ライフ <SortButton onClick={this.onButtonClick} by={idol => idol.life} /></th>
              <th>ボーカル <SortButton onClick={this.onButtonClick} by={idol => idol.vocal} /></th>
              <th>ダンス <SortButton onClick={this.onButtonClick} by={idol => idol.dance} /></th>
              <th>ビジュアル <SortButton onClick={this.onButtonClick} by={idol => idol.visual} /></th>
              <th>総アピール値 <SortButton onClick={this.onButtonClick} by={idol => idol.total()} /></th>
              <th>センター効果</th>
            </tr>
          </thead>
          <tbody>
            {this.data().map((row, i) => <IdolData key={i} onClick={this.onClick(i)} idol={row} isCenter={false} isGuest={false} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

var IdolData = React.createClass({
  render: function() {
    return (
      <tr onClick={this.props.onClick}>
        <td>{this.props.idol.name} {this.props.isCenter ? <span className="badge">センター</span> : this.props.isGuest ? <span className="badge">ゲスト</span> : ''}</td>
        <td>{this.props.idol.type}</td>
        <td>{this.props.idol.rarity}</td>
        <td>{this.props.idol.life}</td>
        <td>{this.props.idol.vocal}</td>
        <td>{this.props.idol.dance}</td>
        <td>{this.props.idol.visual}</td>
        <td>{this.props.idol.total()}</td>
        <td>{this.props.idol.effect}</td>
      </tr>
    );
  }
})

var IdolUnit = React.createClass({
  getInitialState: function() {
    return {unit: model.IdolUnit.empty(), focus: 0};
  },
  onClick: function(n) {
    return e => this.setState({focus: n});
  },
  unit: function() {
    let unit = this.state.unit.effect();
    if (Object.keys(this.refs).length == 0) return unit;
    if (this.refs.all.checked)
      return unit.allType();
    else if (this.refs.cute.checked)
      return unit.cuteType();
    else if (this.refs.cool.checked)
      return unit.coolType();
    else if (this.refs.passion.checked)
      return unit.passionType();
  },
  handleChange: function(e) {
    this.forceUpdate();
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">ユニット</div>
        <div className="panel-body">
          <form className="form-inline" onChange={this.handleChange}>
            <label className="radio-inline"><input ref="all" type="radio" name="music" value="all" defaultChecked={true} />全タイプ曲</label>
            <label className="radio-inline"><input ref="cute" type="radio" name="music" value="cute" /> キュート曲</label>
            <label className="radio-inline"><input ref="cool" type="radio" name="music" value="cool" /> クール曲</label>
            <label className="radio-inline"><input ref="passion" type="radio" name="music" value="passion" /> パッション曲</label>
          </form>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>アイドル</th>
              <th>タイプ</th>
              <th>レア度</th>
              <th>ライフ</th>
              <th>ボーカル</th>
              <th>ダンス</th>
              <th>ビジュアル</th>
              <th>総アピール値</th>
              <th>センター効果</th>
            </tr>
          </thead>
          <tbody>
            {this.state.unit.members().map((row, i) => <IdolData key={i} onClick={this.onClick(i)} idol={row} isCenter={i == 0} isGuest={i == 5} />)}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>{this.unit().life()}(+{this.unit().life() - this.state.unit.life()})</td>
              <td>{this.unit().vocal()}(+{this.unit().vocal() - this.state.unit.vocal()})</td>
              <td>{this.unit().dance()}(+{this.unit().dance() - this.state.unit.dance()})</td>
              <td>{this.unit().visual()}(+{this.unit().visual() - this.state.unit.visual()})</td>
              <td>{this.unit().total()}(+{this.unit().total() - this.state.unit.total()})</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export var App = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: 'data.tsv',
      cache : false,
      success: (text) => {
        let data = text.split('\n').slice(1).map(row => new model.Idol(...row.split('\t').map(col => /^\d+$/.test(col) ? parseInt(col) : col)));
        this.setState({data: data});
      }
    });
  },
  onClick: function(n) {
    let unit = this.refs.unit.state.unit;
    let members = unit.members();
    let index = this.refs.unit.state.focus;
    members[index] = this.refs.table.data()[n];
    this.refs.unit.setState({unit: new model.IdolUnit(...members), focus: index < 5 ? index + 1 : 0});
  },
  render: function() {
    let unit = this.state.data.length > 0 ? <IdolUnit ref="unit" data={this.state.data} /> : '';
    let table = this.state.data.length > 0 ? <IdolTable ref="table" data={this.state.data} onClick={this.onClick} /> : '';
    return (
      <div>
        {unit}
        {table}
      </div>
    );
  }
});
