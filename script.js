class Idol {
  constructor(name, type, rarity, life, vocal, dance, visual, effect) {
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.life = life;
    this.vocal = vocal;
    this.dance = dance;
    this.visual = visual;
    this.effect = effect;
  }
  total() {
    return this.vocal + this.dance + this.visual;
  }
  isCute() {
    return this.type === 'Cu';
  }
  isCool() {
    return this.type === 'Co';
  }
  isPassion() {
    return this.type === 'Pa';
  }
  isNormal() {
    return this.rarity === 'N';
  }
  isRare() {
    return this.rarity === 'R';
  }
  isSRare() {
    return this.rarity === 'SR';
  }
  isSSRare() {
    return this.rarity === 'SSR';
  }
  energy(n) {
    return Object.assign(new Idol, this, {life: Math.ceil(this.life * n)});
  }
  voice(n) {
    return Object.assign(new Idol, this, {vocal: Math.ceil(this.vocal * n)});
  }
  step(n) {
    return Object.assign(new Idol, this, {dance: Math.ceil(this.dance * n)});
  }
  makeup(n) {
    return Object.assign(new Idol, this, {visual: Math.ceil(this.visual * n)});
  }
  brilliance(n) {
    return this.voice(n).step(n).makeup(n);
  }
  static unknown() {
    return new Idol('', '', '', 0, 0, 0, 0, '');
  }
}

const Effects = [
  ['キュートアイドルのボーカルアピール値30%アップ', idol => idol.isCute() ? idol.voice(1.3) : idol],
  ['キュートアイドルのボーカルアピール値60%アップ', idol => idol.isCute() ? idol.voice(1.6) : idol],
  ['キュートアイドルのボーカルアピール値90%アップ', idol => idol.isCute() ? idol.voice(1.9) : idol],
  ['キュートアイドルのダンスアピール値30%アップ', idol => idol.isCute() ? idol.step(1.3) : idol],
  ['キュートアイドルのダンスアピール値60%アップ', idol => idol.isCute() ? idol.step(1.6) : idol],
  ['キュートアイドルのダンスアピール値90%アップ', idol => idol.isCute() ? idol.step(1.9) : idol],
  ['キュートアイドルのビジュアルアピール値30%アップ', idol => idol.isCute() ? idol.makeup(1.3) : idol],
  ['キュートアイドルのビジュアルアピール値60%アップ', idol => idol.isCute() ? idol.makeup(1.6) : idol],
  ['キュートアイドルのビジュアルアピール値90%アップ', idol => idol.isCute() ? idol.makeup(1.9) : idol],
  ['キュートアイドルの全アピール値10%アップ', idol => idol.isCute() ? idol.brilliance(1.1) : idol],
  ['キュートアイドルの全アピール値20%アップ', idol => idol.isCute() ? idol.brilliance(1.2) : idol],
  ['キュートアイドルの全アピール値30%アップ', idol => idol.isCute() ? idol.brilliance(1.3) : idol],
  ['キュートアイドルのライフ10%アップ', idol => idol.isCute() ? idol.energy(1.1) : idol],
  ['キュートアイドルのライフ20%アップ', idol => idol.isCute() ? idol.energy(1.2) : idol],
  ['キュートアイドルの特技発動確率15%アップ', idol => idol],
  ['キュートアイドルの特技発動確率30%アップ', idol => idol],
  ['クールアイドルのボーカルアピール値30%アップ', idol => idol.isCool() ? idol.voice(1.3) : idol],
  ['クールアイドルのボーカルアピール値60%アップ', idol => idol.isCool() ? idol.voice(1.6) : idol],
  ['クールアイドルのボーカルアピール値90%アップ', idol => idol.isCool() ? idol.voice(1.9) : idol],
  ['クールアイドルのダンスアピール値30%アップ', idol => idol.isCool() ? idol.step(1.3) : idol],
  ['クールアイドルのダンスアピール値60%アップ', idol => idol.isCool() ? idol.step(1.6) : idol],
  ['クールアイドルのダンスアピール値90%アップ', idol => idol.isCool() ? idol.step(1.9) : idol],
  ['クールアイドルのビジュアルアピール値30%アップ', idol => idol.isCool() ? idol.makeup(1.3) : idol],
  ['クールアイドルのビジュアルアピール値60%アップ', idol => idol.isCool() ? idol.makeup(1.6) : idol],
  ['クールアイドルのビジュアルアピール値90%アップ', idol => idol.isCool() ? idol.makeup(1.9) : idol],
  ['クールアイドルの全アピール値10%アップ', idol => idol.isCool() ? idol.brilliance(1.1) : idol],
  ['クールアイドルの全アピール値20%アップ', idol => idol.isCool() ? idol.brilliance(1.2) : idol],
  ['クールアイドルの全アピール値30%アップ', idol => idol.isCool() ? idol.brilliance(1.3) : idol],
  ['クールアイドルのライフ10%アップ', idol => idol.isCool() ? idol.energy(1.1) : idol],
  ['クールアイドルのライフ20%アップ', idol => idol.isCool() ? idol.energy(1.2) : idol],
  ['クールアイドルの特技発動確率15%アップ', idol => idol],
  ['クールアイドルの特技発動確率30%アップ', idol => idol],
  ['パッションアイドルのボーカルアピール値30%アップ', idol => idol.isPassion() ? idol.voice(1.3) : idol],
  ['パッションアイドルのボーカルアピール値60%アップ', idol => idol.isPassion() ? idol.voice(1.6) : idol],
  ['パッションアイドルのボーカルアピール値90%アップ', idol => idol.isPassion() ? idol.voice(1.9) : idol],
  ['パッションアイドルのダンスアピール値30%アップ', idol => idol.isPassion() ? idol.step(1.3) : idol],
  ['パッションアイドルのダンスアピール値60%アップ', idol => idol.isPassion() ? idol.step(1.6) : idol],
  ['パッションアイドルのダンスアピール値90%アップ', idol => idol.isPassion() ? idol.step(1.9) : idol],
  ['パッションアイドルのビジュアルアピール値30%アップ', idol => idol.isPassion() ? idol.makeup(1.3) : idol],
  ['パッションアイドルのビジュアルアピール値60%アップ', idol => idol.isPassion() ? idol.makeup(1.6) : idol],
  ['パッションアイドルのビジュアルアピール値90%アップ', idol => idol.isPassion() ? idol.makeup(1.9) : idol],
  ['パッションアイドルの全アピール値10%アップ', idol => idol.isPassion() ? idol.brilliance(1.1) : idol],
  ['パッションアイドルの全アピール値20%アップ', idol => idol.isPassion() ? idol.brilliance(1.2) : idol],
  ['パッションアイドルの全アピール値30%アップ', idol => idol.isPassion() ? idol.brilliance(1.3) : idol],
  ['パッションアイドルのライフ10%アップ', idol => idol.isPassion() ? idol.energy(1.1) : idol],
  ['パッションアイドルのライフ20%アップ', idol => idol.isPassion() ? idol.energy(1.2) : idol],
  ['パッションアイドルの特技発動確率15%アップ', idol => idol],
  ['パッションアイドルの特技発動確率30%アップ', idol => idol],
  ['全員のボーカルアピール値48%アップ', idol => idol.voice(1.48)],
  ['', idol => idol]
]

class Unit {
  constructor(center, member1, member2, member3, member4, guest) {
    this.center = center;
    this.member1 = member1;
    this.member2 = member2;
    this.member3 = member3;
    this.member4 = member4;
    this.guest = guest;
  }
  members() {
    return [this.center, this.member1, this.member2, this.member3, this.member4, this.guest];
  }
  effect() {
    let effects = new Map(Effects);
    let unit = new Unit(...this.members().map(idol => effects.get(this.center.effect)(effects.get(this.guest.effect)(idol))));
    return unit;
  }
  life() {
    return this.members().map(idol => idol.life).reduce((x, y) => x + y, 0);
  }
  vocal() {
    return this.members().map(idol => idol.vocal).reduce((x, y) => x + y, 0);
  }
  dance() {
    return this.members().map(idol => idol.dance).reduce((x, y) => x + y, 0);
  }
  visual() {
    return this.members().map(idol => idol.visual).reduce((x, y) => x + y, 0);
  }
  total() {
    return this.members().map(idol => idol.total()).reduce((x, y) => x + y, 0);
  }
  cuteType() {
    return new Unit(...this.members().map(idol => idol.isCute() ? idol.brilliance(1.3) : idol));
  }
  coolType() {
    return new Unit(...this.members().map(idol => idol.isCool() ? idol.brilliance(1.3) : idol));
  }
  passionType() {
    return new Unit(...this.members().map(idol => idol.isPassion() ? idol.brilliance(1.3) : idol));
  }
  allType() {
    return new Unit(...this.members().map(idol => idol.brilliance(1.3)));
  }
  static empty() {
    return new Unit(Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown());
  }
}

class Table {
  constructor(idols) {
    this.idols = idols;
  }
  filter(isCute, isCool, isPassion, isNormal, isRare, isSRare, isSSRare) {
    let testType = idol => idol.isCute() ? isCute : idol.isCool() ? isCool : idol.isPassion() ? isPassion : false;
    let testRarity = idol => idol.isNormal() ? isNormal : idol.isRare() ? isRare : idol.isSRare() ? isSRare : idol.isSSRare() ? isSSRare : false;
    let idols = this.idols.filter(idol => testType(idol) && testRarity(idol));
    return new Table(idols);
  }
  sort(get, desc) {
    let compare = desc ? (x, y) => get(y) - get(x) : (x, y) => get(x) - get(y);
    let idols = this.idols.slice(0).sort(compare);
    return new Table(idols);
  }
  auto() {
    this.idols.map(center => this.idols.map(guest => this.idols.filter(idol => !(idol == center || idol == guest))))
  }
}

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

var IdolTable = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  onClick: function(n) {
    return e => this.props.onClick(n);
  },
  onButtonClick: function(sort) {
    this.setState({data: sort(this.props.data)});
  },
  checkType: function(idol) {
    if (Object.keys(this.refs).length == 0)
      return true;
    else if (idol.isCute())
      return this.refs.cute.checked;
    else if (idol.isCool())
      return this.refs.cool.checked;
    else if (idol.isPassion())
      return this.refs.passion.checked;
  },
  checkRarity: function(idol) {
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
  },
  handleChange: function(e) {
    this.forceUpdate();
  },
  data: function() {
    return this.state.data.filter(idol => this.checkType(idol) && this.checkRarity(idol));
  },
  render: function() {
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
});

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
    return {unit: Unit.empty(), focus: 0};
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

var App = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: 'data.tsv',
      cache : false,
      success: (text) => {
        let data = text.split('\n').slice(1).map(row => new Idol(...row.split('\t').map(col => /^\d+$/.test(col) ? parseInt(col) : col)));
        this.setState({data: data});
      }
    });
  },
  onClick: function(n) {
    let unit = this.refs.unit.state.unit;
    let members = unit.members();
    let index = this.refs.unit.state.focus;
    members[index] = this.refs.table.data()[n];
    this.refs.unit.setState({unit: new Unit(...members), focus: index < 5 ? index + 1 : 0});
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

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
