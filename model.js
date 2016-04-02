export class Idol {
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
  static unknown() {
    return new Idol('', '', '', 0, 0, 0, 0, '');
  }
}

class Appeal {
  constructor(life, vocal, dance, visual) {
    this.life = life;
    this.vocal = vocal;
    this.dance = dance;
    this.visual = visual;
  }
  add(that) {
    return new Appeal(this.life + that.life, this.vocal + that.vocal, this.dance + that.dance, this.visual + that.visual);
  }
  static zero() {
    return new Appeal(0, 0, 0, 0);
  }
}

export class Effect {
  constructor(cute, cool, passion) {
    this.cute = cute;
    this.cool = cool;
    this.passion = passion;
  }
  apply(idol) {
    let appeal = idol.isCute() ? this.cute : idol.isCool() ? this.cool : idol.isPassion() ? this.passion : Appeal.zero();
    let life = Math.ceil(idol.life * (100 + appeal.life) / 100);
    let vocal = Math.ceil(idol.vocal * (110 + appeal.vocal) / 100);
    let dance = Math.ceil(idol.dance * (110 + appeal.dance) / 100);
    let visual = Math.ceil(idol.visual * (110 + appeal.visual) / 100);
    return new Idol(idol.name, idol.type, idol.rarity, life, vocal, dance, visual, idol.effect);
  }
  compose(that) {
    return new Effect(this.cute.add(that.cute), this.cool.add(that.cool), this.passion.add(that.passion));
  }
  static identity() {
    return new Effect(Appeal.zero(), Appeal.zero(), Appeal.zero());
  }
}

export const AllTypeMusic = new Effect(new Appeal(0, 30, 30, 30), new Appeal(0, 30, 30, 30), new Appeal(0, 30, 30, 30));

export const CuteMusic = new Effect(new Appeal(0, 30, 30, 30), Appeal.zero(), Appeal.zero());

export const CoolMusic = new Effect(Appeal.zero(), new Appeal(0, 30, 30, 30), Appeal.zero());

export const PassionMusic = new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 30, 30, 30));

const Effects = new Map([
  ['キュートアイドルのボーカルアピール値30%アップ', new Effect(new Appeal(0, 30, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのボーカルアピール値60%アップ', new Effect(new Appeal(0, 60, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのボーカルアピール値90%アップ', new Effect(new Appeal(0, 90, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのダンスアピール値30%アップ', new Effect(new Appeal(0, 0, 30, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのダンスアピール値60%アップ', new Effect(new Appeal(0, 0, 60, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのダンスアピール値90%アップ', new Effect(new Appeal(0, 0, 90, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのビジュアルアピール値30%アップ', new Effect(new Appeal(0, 0, 0, 30), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのビジュアルアピール値60%アップ', new Effect(new Appeal(0, 0, 0, 60), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのビジュアルアピール値90%アップ', new Effect(new Appeal(0, 0, 0, 90), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルの全アピール値10%アップ', new Effect(new Appeal(0, 10, 10, 10), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルの全アピール値20%アップ', new Effect(new Appeal(0, 20, 20, 20), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルの全アピール値30%アップ', new Effect(new Appeal(0, 30, 30, 30), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのライフ10%アップ', new Effect(new Appeal(10, 0, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのライフ20%アップ', new Effect(new Appeal(20, 0, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルのライフ30%アップ', new Effect(new Appeal(30, 0, 0, 0), Appeal.zero(), Appeal.zero())],
  ['キュートアイドルの特技発動確率15%アップ', Effect.identity()],
  ['キュートアイドルの特技発動確率30%アップ', Effect.identity()],
  ['クールアイドルのボーカルアピール値30%アップ', new Effect(Appeal.zero(), new Appeal(0, 30, 0, 0), Appeal.zero())],
  ['クールアイドルのボーカルアピール値60%アップ', new Effect(Appeal.zero(), new Appeal(0, 60, 0, 0), Appeal.zero())],
  ['クールアイドルのボーカルアピール値90%アップ', new Effect(Appeal.zero(), new Appeal(0, 90, 0, 0), Appeal.zero())],
  ['クールアイドルのダンスアピール値30%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 30, 0), Appeal.zero())],
  ['クールアイドルのダンスアピール値60%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 60, 0), Appeal.zero())],
  ['クールアイドルのダンスアピール値90%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 90, 0), Appeal.zero())],
  ['クールアイドルのビジュアルアピール値30%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 0, 30), Appeal.zero())],
  ['クールアイドルのビジュアルアピール値60%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 0, 60), Appeal.zero())],
  ['クールアイドルのビジュアルアピール値90%アップ', new Effect(Appeal.zero(), new Appeal(0, 0, 0, 90), Appeal.zero())],
  ['クールアイドルの全アピール値10%アップ', new Effect(Appeal.zero(), new Appeal(0, 10, 10, 10), Appeal.zero())],
  ['クールアイドルの全アピール値20%アップ', new Effect(Appeal.zero(), new Appeal(0, 20, 20, 20), Appeal.zero())],
  ['クールアイドルの全アピール値30%アップ', new Effect(Appeal.zero(), new Appeal(0, 30, 30, 30), Appeal.zero())],
  ['クールアイドルのライフ10%アップ', new Effect(Appeal.zero(), new Appeal(10, 0, 0, 0), Appeal.zero())],
  ['クールアイドルのライフ20%アップ', new Effect(Appeal.zero(), new Appeal(20, 0, 0, 0), Appeal.zero())],
  ['クールアイドルのライフ30%アップ', new Effect(Appeal.zero(), new Appeal(30, 0, 0, 0), Appeal.zero())],
  ['クールアイドルの特技発動確率15%アップ', Effect.identity()],
  ['クールアイドルの特技発動確率30%アップ', Effect.identity()],
  ['パッションアイドルのボーカルアピール値30%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 30, 0, 0))],
  ['パッションアイドルのボーカルアピール値60%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 60, 0, 0))],
  ['パッションアイドルのボーカルアピール値90%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 90, 0, 0))],
  ['パッションアイドルのダンスアピール値30%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 30, 0))],
  ['パッションアイドルのダンスアピール値60%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 60, 0))],
  ['パッションアイドルのダンスアピール値90%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 90, 0))],
  ['パッションアイドルのビジュアルアピール値30%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 0, 30))],
  ['パッションアイドルのビジュアルアピール値60%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 0, 60))],
  ['パッションアイドルのビジュアルアピール値90%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 0, 0, 90))],
  ['パッションアイドルの全アピール値10%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 10, 10, 10))],
  ['パッションアイドルの全アピール値20%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 20, 20, 20))],
  ['パッションアイドルの全アピール値30%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(0, 30, 30, 30))],
  ['パッションアイドルのライフ10%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(10, 0, 0, 0))],
  ['パッションアイドルのライフ20%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(20, 0, 0, 0))],
  ['パッションアイドルのライフ30%アップ', new Effect(Appeal.zero(), Appeal.zero(), new Appeal(30, 0, 0, 0))],
  ['パッションアイドルの特技発動確率15%アップ', Effect.identity()],
  ['パッションアイドルの特技発動確率30%アップ', Effect.identity()],
  ['全員のボーカルアピール値48%アップ', new Effect(new Appeal(0, 48, 0, 0), new Appeal(0, 48, 0, 0), new Appeal(0, 48, 0, 0))],
  ['', Effect.identity()]
]);

export class IdolUnit {
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
  effect(music) {
    let effect = Effects.get(this.center.effect).compose(Effects.get(this.guest.effect)).compose(music);
    return new IdolUnit(...this.members().map(idol => effect.apply(idol)));
  }
  life() {
    return this.members().reduce((n, idol) => n + idol.life, 0);
  }
  vocal() {
    return this.members().reduce((n, idol) => n + idol.vocal, 0);
  }
  dance() {
    return this.members().reduce((n, idol) => n + idol.dance, 0);
  }
  visual() {
    return this.members().reduce((n, idol) => n + idol.visual, 0);
  }
  total() {
    return this.members().reduce((n, idol) => n + idol.total(), 0);
  }
  static empty() {
    return new IdolUnit(Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown());
  }
}

export class IdolTable {
  constructor(idols, master) {
    this.idols = idols;
    this.master = master;
  }
  filter(isCute, isCool, isPassion, isNormal, isRare, isSRare, isSSRare) {
    let testType = idol => idol.isCute() ? isCute : idol.isCool() ? isCool : idol.isPassion() ? isPassion : false;
    let testRarity = idol => idol.isNormal() ? isNormal : idol.isRare() ? isRare : idol.isSRare() ? isSRare : idol.isSSRare() ? isSSRare : false;
    let idols = this.idols.filter(idol => testType(idol) && testRarity(idol));
    return new IdolTable(idols, this.master);
  }
  sort(get, desc) {
    let compare = desc ? (x, y) => get(y) - get(x) : (x, y) => get(x) - get(y);
    let idols = this.idols.slice(0).sort(compare);
    return new IdolTable(idols, this.master);
  }
  unit(music) {
    let result = IdolUnit.empty();
    let guests = this.master.filter(idol => idol.isSSRare());
    for (let center of this.idols) {
      let centerEffect = Effects.get(center.effect);
      for (let guest of guests) {
        let guestEffect = Effects.get(guest.effect);
        let effect = centerEffect.compose(guestEffect).compose(music);
        let members = [Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown()];
        for (let idol of this.idols) {
          if (idol.name != center.name) {
            idol = effect.apply(idol);
            if (members[0].total() < idol.total()) {
              members[3] = members[2];
              members[2] = members[1];
              members[1] = members[0];
              members[0] = idol;
            } else if (members[1].total() < idol.total()) {
              members[3] = members[2];
              members[2] = members[1];
              members[1] = idol;
            } else if (members[2].total() < idol.total()) {
              members[3] = members[2];
              members[2] = idol;
            } else if (members[3].total() < idol.total()) {
              members[3] = idol;
            }
          }
        }
        let unit = new IdolUnit(effect.apply(center), members[0], members[1], members[2], members[3], effect.apply(guest));
        if (result.total() < unit.total()) {
          result = unit;
        }
      }
    }
    return new IdolUnit(...result.members().map(idol => this.master.filter(i => i.name === idol.name)[0]));
  }
}
