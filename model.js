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
  static life(n) {
    return new Appeal(n, 0, 0, 0);
  }
  static vocal(n) {
    return new Appeal(0, n, 0, 0);
  }
  static dance(n) {
    return new Appeal(0, 0, n, 0);
  }
  static visual(n) {
    return new Appeal(0, 0, 0, n);
  }
  static all(n) {
    return new Appeal(0, n, n, n);
  }
  static zero() {
    return new Appeal(0, 0, 0, 0);
  }
}

class Effect {
  constructor(cute, cool, passion) {
    this.cute = cute;
    this.cool = cool;
    this.passion = passion;
  }
  apply(idol) {
    let appeal = idol.isCute() ? this.cute : idol.isCool() ? this.cool : idol.isPassion() ? this.passion : Appeal.zero();
    let life = Math.ceil(idol.life * (100 + appeal.life) / 100);
    let vocal = Math.ceil(idol.vocal * (100 + appeal.vocal) / 100);
    let dance = Math.ceil(idol.dance * (100 + appeal.dance) / 100);
    let visual = Math.ceil(idol.visual * (100 + appeal.visual) / 100);
    return new Idol(idol.name, idol.type, idol.rarity, life, vocal, dance, visual, idol.effect);
  }
  compose(that) {
    return new Effect(this.cute.add(that.cute), this.cool.add(that.cool), this.passion.add(that.passion));
  }
  static cute(appeal) {
    return new Effect(appeal, Appeal.zero(), Appeal.zero());
  }
  static cool(appeal) {
    return new Effect(Appeal.zero(), appeal, Appeal.zero());
  }
  static passion(appeal) {
    return new Effect(Appeal.zero(), Appeal.zero(), appeal);
  }
  static all(appeal) {
    return new Effect(appeal, appeal, appeal);
  }
  static identity() {
    return Effect.all(Appeal.zero());
  }
}

export const AllTypeMusic = Effect.all(Appeal.all(30));

export const CuteMusic = Effect.cute(Appeal.all(30));

export const CoolMusic = Effect.cool(Appeal.all(30));

export const PassionMusic = Effect.passion(Appeal.all(30));

export const RoomEffect = Effect.all(Appeal.all(10));

const Effects = new Map([
  ['キュートアイドルのボーカルアピール値30%アップ', Effect.cute(Appeal.vocal(30))],
  ['キュートアイドルのボーカルアピール値60%アップ', Effect.cute(Appeal.vocal(60))],
  ['キュートアイドルのボーカルアピール値90%アップ', Effect.cute(Appeal.vocal(90))],
  ['キュートアイドルのダンスアピール値30%アップ', Effect.cute(Appeal.dance(30))],
  ['キュートアイドルのダンスアピール値60%アップ', Effect.cute(Appeal.dance(60))],
  ['キュートアイドルのダンスアピール値90%アップ', Effect.cute(Appeal.dance(90))],
  ['キュートアイドルのビジュアルアピール値30%アップ', Effect.cute(Appeal.visual(30))],
  ['キュートアイドルのビジュアルアピール値60%アップ', Effect.cute(Appeal.visual(60))],
  ['キュートアイドルのビジュアルアピール値90%アップ', Effect.cute(Appeal.visual(90))],
  ['キュートアイドルの全アピール値10%アップ', Effect.cute(Appeal.all(10))],
  ['キュートアイドルの全アピール値20%アップ', Effect.cute(Appeal.all(20))],
  ['キュートアイドルの全アピール値30%アップ', Effect.cute(Appeal.all(30))],
  ['キュートアイドルのライフ10%アップ', Effect.cute(Appeal.life(10))],
  ['キュートアイドルのライフ20%アップ', Effect.cute(Appeal.life(20))],
  ['キュートアイドルのライフ30%アップ', Effect.cute(Appeal.life(30))],
  ['キュートアイドルの特技発動確率15%アップ', Effect.identity()],
  ['キュートアイドルの特技発動確率30%アップ', Effect.identity()],
  ['クールアイドルのボーカルアピール値30%アップ', Effect.cool(Appeal.vocal(30))],
  ['クールアイドルのボーカルアピール値60%アップ', Effect.cool(Appeal.vocal(60))],
  ['クールアイドルのボーカルアピール値90%アップ', Effect.cool(Appeal.vocal(90))],
  ['クールアイドルのダンスアピール値30%アップ', Effect.cool(Appeal.dance(30))],
  ['クールアイドルのダンスアピール値60%アップ', Effect.cool(Appeal.dance(60))],
  ['クールアイドルのダンスアピール値90%アップ', Effect.cool(Appeal.dance(90))],
  ['クールアイドルのビジュアルアピール値30%アップ', Effect.cool(Appeal.visual(30))],
  ['クールアイドルのビジュアルアピール値60%アップ', Effect.cool(Appeal.visual(60))],
  ['クールアイドルのビジュアルアピール値90%アップ', Effect.cool(Appeal.visual(90))],
  ['クールアイドルの全アピール値10%アップ', Effect.cool(Appeal.all(10))],
  ['クールアイドルの全アピール値20%アップ', Effect.cool(Appeal.all(20))],
  ['クールアイドルの全アピール値30%アップ', Effect.cool(Appeal.all(30))],
  ['クールアイドルのライフ10%アップ', Effect.cool(Appeal.life(10))],
  ['クールアイドルのライフ20%アップ', Effect.cool(Appeal.life(20))],
  ['クールアイドルのライフ30%アップ', Effect.cool(Appeal.life(30))],
  ['クールアイドルの特技発動確率15%アップ', Effect.identity()],
  ['クールアイドルの特技発動確率30%アップ', Effect.identity()],
  ['パッションアイドルのボーカルアピール値30%アップ', Effect.passion(Appeal.vocal(30))],
  ['パッションアイドルのボーカルアピール値60%アップ', Effect.passion(Appeal.vocal(60))],
  ['パッションアイドルのボーカルアピール値90%アップ', Effect.passion(Appeal.vocal(90))],
  ['パッションアイドルのダンスアピール値30%アップ', Effect.passion(Appeal.dance(30))],
  ['パッションアイドルのダンスアピール値60%アップ', Effect.passion(Appeal.dance(60))],
  ['パッションアイドルのダンスアピール値90%アップ', Effect.passion(Appeal.dance(90))],
  ['パッションアイドルのビジュアルアピール値30%アップ', Effect.passion(Appeal.visual(30))],
  ['パッションアイドルのビジュアルアピール値60%アップ', Effect.passion(Appeal.visual(60))],
  ['パッションアイドルのビジュアルアピール値90%アップ', Effect.passion(Appeal.visual(90))],
  ['パッションアイドルの全アピール値10%アップ', Effect.passion(Appeal.all(10))],
  ['パッションアイドルの全アピール値20%アップ', Effect.passion(Appeal.all(20))],
  ['パッションアイドルの全アピール値30%アップ', Effect.passion(Appeal.all(30))],
  ['パッションアイドルのライフ10%アップ', Effect.passion(Appeal.life(10))],
  ['パッションアイドルのライフ20%アップ', Effect.passion(Appeal.life(20))],
  ['パッションアイドルのライフ30%アップ', Effect.passion(Appeal.life(30))],
  ['パッションアイドルの特技発動確率15%アップ', Effect.identity()],
  ['パッションアイドルの特技発動確率30%アップ', Effect.identity()],
  ['全員のボーカルアピール値48%アップ', Effect.all(Appeal.vocal(48))],
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
