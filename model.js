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
  energy(n) {
    return new Idol(this.name, this.type, this.rarity, Math.ceil(this.life * n), this.vocal, this.dance, this.visual, this.effect);
  }
  voice(n) {
    return new Idol(this.name, this.type, this.rarity, this.life, Math.ceil(this.vocal * n), this.dance, this.visual, this.effect);
  }
  step(n) {
    return new Idol(this.name, this.type, this.rarity, this.life, this.vocal, Math.ceil(this.dance * n), this.visual, this.effect);
  }
  makeup(n) {
    return new Idol(this.name, this.type, this.rarity, this.life, this.vocal, this.dance, Math.ceil(this.visual * n), this.effect);
  }
  brilliance(n) {
    return new Idol(this.name, this.type, this.rarity, this.life, Math.ceil(this.vocal * n), Math.ceil(this.dance * n), Math.ceil(this.visual * n), this.effect);
  }
  static unknown() {
    return new Idol('', '', '', 0, 0, 0, 0, '');
  }
}

const Effects = new Map([
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
  effect() {
    return new IdolUnit(...this.members().map(idol => Effects.get(this.center.effect)(Effects.get(this.guest.effect)(idol))));
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
  cuteType() {
    return new IdolUnit(...this.members().map(idol => idol.isCute() ? idol.brilliance(1.3) : idol));
  }
  coolType() {
    return new IdolUnit(...this.members().map(idol => idol.isCool() ? idol.brilliance(1.3) : idol));
  }
  passionType() {
    return new IdolUnit(...this.members().map(idol => idol.isPassion() ? idol.brilliance(1.3) : idol));
  }
  allType() {
    return new IdolUnit(...this.members().map(idol => idol.brilliance(1.3)));
  }
  static empty() {
    return new IdolUnit(Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown());
  }
}

export class IdolTable {
  constructor(idols) {
    this.idols = idols;
    this.master = idols;
  }
  filter(isCute, isCool, isPassion, isNormal, isRare, isSRare, isSSRare) {
    let testType = idol => idol.isCute() ? isCute : idol.isCool() ? isCool : idol.isPassion() ? isPassion : false;
    let testRarity = idol => idol.isNormal() ? isNormal : idol.isRare() ? isRare : idol.isSRare() ? isSRare : idol.isSSRare() ? isSSRare : false;
    let idols = this.idols.filter(idol => testType(idol) && testRarity(idol));
    return Object.assign(new IdolTable, this, {idols: idols});
  }
  sort(get, desc) {
    let compare = desc ? (x, y) => get(y) - get(x) : (x, y) => get(x) - get(y);
    let idols = this.idols.slice(0).sort(compare);
    return Object.assign(new IdolTable, this, {idols: idols});
  }
  unit() {
    let result = IdolUnit.empty();
    let guests = this.master.filter(idol => idol.isSSRare());
    for (let center of this.idols) {
      let centerEffect = Effects.get(center.effect);
      for (let guest of guests) {
        let guestEffect = Effects.get(guest.effect);
        let members = [Idol.unknown(), Idol.unknown(), Idol.unknown(), Idol.unknown()];
        for (let idol of this.idols) {
          if (idol != center) {
            idol = centerEffect(guestEffect(idol));
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
        let unit = new IdolUnit(center, members[0], members[1], members[2], members[3], guest);
        if (result.total() < unit.total()) {
          result = unit;
        }
      }
    }
    return result;
  }
}
