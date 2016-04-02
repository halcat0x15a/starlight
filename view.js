import * as model from './model';
import React from 'react';
import ReactDOM from 'react-dom';

class SortButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {order: 'sort'};
  }
  onClick(event) {
    this.props.onClick(this);
  }
  render() {
    return (
      <a href="#" role="button">
        <span className={"glyphicon glyphicon-" + this.state.order} aria-hidden="true" onClick={this.onClick.bind(this)}></span>
      </a>
    );
  }
  sort(array) {
    switch (this.state.order) {
    case 'sort':
      this.setState({order: 'sort-by-order-alt'});
      return array.slice(0).sort((x, y) => this.props.by(y) - this.props.by(x));
    case 'sort-by-order-alt':
      this.setState({order: 'sort-by-order'});
      return array.slice(0).sort((x, y) => this.props.by(x) - this.props.by(y));
    case 'sort-by-order':
      this.setState({order: 'sort'});
      return array;
    }
  }
  reset() {
    this.setState({order: 'sort'});
  }
}

SortButton.propTypes = {
  by: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired
}

class IdolTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.data};
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
  data() {
    return this.state.data.filter(idol => this.checkType(idol) && this.checkRarity(idol));
  }
  sort(target) {
    for (let button of [this.refs.life, this.refs.vocal, this.refs.dance, this.refs.visual, this.refs.total]) {
      if (target === button) {
        this.setState({data: button.sort(this.props.data)});
      } else {
        button.reset();
      }
    }
  }
  handleChange(e) {
    this.forceUpdate();
  }
  onClick(n) {
    return e => {
      window.document.location = '#unit';
      this.props.onClick(n);
    }
  }
  render() {
    return (
      <div className="panel panel-default" name="table">
        <div className="panel-heading">アイドル一覧</div>
        <div className="panel-body">
          <form onChange={this.handleChange.bind(this)}>
            <label className="checkbox-inline"><input type="checkbox" ref="cute" defaultChecked={true} /> キュート</label>
            <label className="checkbox-inline"><input type="checkbox" ref="cool" defaultChecked={true} /> クール</label>
            <label className="checkbox-inline"><input type="checkbox" ref="passion" defaultChecked={true} /> パッション</label>
            <label className="checkbox-inline"><input type="checkbox" ref="normal" defaultChecked={true} /> ノーマル</label>
            <label className="checkbox-inline"><input type="checkbox" ref="rare" defaultChecked={true} /> レア</label>
            <label className="checkbox-inline"><input type="checkbox" ref="srare" defaultChecked={true} /> Sレア</label>
            <label className="checkbox-inline"><input type="checkbox" ref="ssrare" defaultChecked={true} /> SSレア</label>
          </form>
        </div>
        <table className="table table-hover table-striped table-condensed">
          <thead>
            <tr>
              <th>アイドル</th>
              <th>タイプ</th>
              <th>レア度</th>
              <th>ライフ <SortButton ref="life" by={idol => idol.life} onClick={this.sort.bind(this)} /></th>
              <th>ボーカル <SortButton ref="vocal" by={idol => idol.vocal} onClick={this.sort.bind(this)} /></th>
              <th>ダンス <SortButton ref="dance" by={idol => idol.dance} onClick={this.sort.bind(this)} /></th>
              <th>ビジュアル <SortButton ref="visual" by={idol => idol.visual} onClick={this.sort.bind(this)} /></th>
              <th>総アピール値 <SortButton ref="total" by={idol => idol.total()} onClick={this.sort.bind(this)} /></th>
              <th>センター効果</th>
            </tr>
          </thead>
          <tbody>
            {this.data().map((idol, i) =>
              <tr key={i} onClick={this.onClick(i)}>
                <td>{idol.name}</td>
                <td>{idol.type}</td>
                <td>{idol.rarity}</td>
                <td>{idol.life}</td>
                <td>{idol.vocal}</td>
                <td>{idol.dance}</td>
                <td>{idol.visual}</td>
                <td>{idol.total()}</td>
                <td>{idol.effect}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class IdolUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {unit: model.IdolUnit.empty(), focus: 0};
  }
  onClick(n) {
    return e => this.setState({focus: n});
  }
  unit() {
    let unit = this.state.unit;
    if (Object.keys(this.refs).length == 0) return unit;
    return unit.effect(this.music());
  }
  handleChange(e) {
    this.forceUpdate();
  }
  dissolve(event) {
    this.setState({unit: model.IdolUnit.empty(), focus: 0});
  }
  music() {
    return this.refs.all.checked ? model.AllTypeMusic : this.refs.cute.checked ? model.CuteMusic : this.refs.cool.checked ? model.CoolMusic : this.refs.passion.checked ? model.PassionMusic : model.Effect.identity();
  }
  recommend(event) {
    let unit = new model.IdolTable(this.props.data, this.props.data).unit(this.music());
    this.setState({unit: unit, focus: 0});
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><a name="unit" href="#unit">ユニット</a></div>
        <div className="panel-body">
          <form className="form-inline" onChange={this.handleChange.bind(this)}>
            <label className="radio-inline"><input ref="all" type="radio" name="music" value="all" defaultChecked={true} />全タイプ曲</label>
            <label className="radio-inline"><input ref="cute" type="radio" name="music" value="cute" /> キュート曲</label>
            <label className="radio-inline"><input ref="cool" type="radio" name="music" value="cool" /> クール曲</label>
            <label className="radio-inline"><input ref="passion" type="radio" name="music" value="passion" /> パッション曲</label>
          </form>
          <table className="table table-hover table-condensed">
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
              {this.state.unit.members().map((idol, i) =>
                <tr key={i} className={this.state.focus === i ? 'active' : ''} onClick={this.onClick(i)}>
                  <td>{idol.name} {i === 0 && idol.name != '' ? <span className="badge">センター</span> : i === 5 && idol.name != '' ? <span className="badge">ゲスト</span> : ''}</td>
                  <td>{idol.type}</td>
                  <td>{idol.rarity}</td>
                  <td>{idol.life}</td>
                  <td>{idol.vocal}</td>
                  <td>{idol.dance}</td>
                  <td>{idol.visual}</td>
                  <td>{idol.total()}</td>
                  <td>{idol.effect}</td>
                </tr>
              )}
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
          <div className="text-center">
            <button className="btn btn-default" type="button" onClick={this.dissolve.bind(this)}>解散する</button>
            {' '}
            <button className="btn btn-default" type="button" onClick={this.recommend.bind(this)}>おすすめ編成</button>
          </div>
        </div>
      </div>
    );
  }
}

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: []};
  }
  componentDidMount() {
    $.ajax({
      url: 'data.tsv',
      cache : false,
      success: (text) => {
        let data = text.split('\n').slice(1).filter(row => row.trim() != '').map(row => new model.Idol(...row.split('\t').map(col => /^\d+$/.test(col) ? parseInt(col) : col)));
        console.log(data);
        this.setState({data: data});
      }
    });
  }
  onClick(n) {
    let unit = this.refs.unit.state.unit;
    let members = unit.members();
    let index = this.refs.unit.state.focus;
    members[index] = this.refs.table.data()[n];
    this.refs.unit.setState({unit: new model.IdolUnit(...members), focus: index < 5 ? index + 1 : 0});
  }
  render() {
    let unit = this.state.data.length > 0 ? <IdolUnit ref="unit" data={this.state.data} /> : '';
    let table = this.state.data.length > 0 ? <IdolTable ref="table" data={this.state.data} onClick={this.onClick.bind(this)} /> : '';
    return (
      <div>
        {unit}
        {table}
      </div>
    );
  }
}
