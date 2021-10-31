export class Round {
  constructor({ id, name, season_id, from_date, to_date, head_to_head }) {
    this.id = id;
    this.name = name;
    this.season_id = season_id;
    this.from_date = from_date;
    this.to_date = to_date;
    this.head_to_head = head_to_head;
  }
}
export class H2HSquadPayload {
  constructor({
    scheme,
    round_id,
    whoscored_id_1,
    whoscored_id_2,
    whoscored_id_3,
    whoscored_id_4,
    whoscored_id_5,
    whoscored_id_6,
    whoscored_id_7,
    whoscored_id_8,
    whoscored_id_9,
    whoscored_id_10,
    whoscored_id_11,
  }) {
    this.scheme = scheme;
    this.round_id = round_id;
    this.whoscored_id_1 = whoscored_id_1;
    this.whoscored_id_2 = whoscored_id_2;
    this.whoscored_id_3 = whoscored_id_3;
    this.whoscored_id_4 = whoscored_id_4;
    this.whoscored_id_5 = whoscored_id_5;
    this.whoscored_id_6 = whoscored_id_6;
    this.whoscored_id_7 = whoscored_id_7;
    this.whoscored_id_8 = whoscored_id_8;
    this.whoscored_id_9 = whoscored_id_9;
    this.whoscored_id_10 = whoscored_id_10;
    this.whoscored_id_11 = whoscored_id_11;
  }
}
export class CupSquadPayload {
  constructor({ round_id, dc, dl, dr, gk, mc, ml, mr, st }) {
    this.round_id = round_id;
    this.dc = dc;
    this.dl = dl;
    this.dr = dr;
    this.gk = gk;
    this.mc = mc;
    this.ml = ml;
    this.mr = mr;
    this.st = st;
  }
}

export class squadPayload {
  constructor({
    league_id,
    round_id,
    cpt,
    vice_cpt,
    dc1,
    dc2,
    dl1,
    dl2,
    dr1,
    dr2,
    gk,
    mc1,
    mc2,
    ml1,
    ml2,
    mr1,
    mr2,
    st1,
    st2,
    st3,
  }) {
    this.season_id = 1;
    this.league_id = league_id;
    this.round_id = round_id;
    this.cpt = cpt;
    this.vice_cpt = vice_cpt;
    this.dc1 = dc1;
    this.dc2 = dc2;
    this.dl1 = dl1;
    this.dl2 = dl2;
    this.dr1 = dr1;
    this.dr2 = dr2;
    this.gk = gk;
    this.mc1 = mc1;
    this.mc2 = mc2;
    this.ml1 = ml1;
    this.ml2 = ml2;
    this.mr1 = mr1;
    this.mr2 = mr2;
    this.st1 = st1;
    this.st2 = st2;
    this.st3 = st3;
  }
}
export class FootballPlayer {
  constructor({
    id,
    club,
    football_league_id,
    league,
    name,
    points,
    position,
    shirt,
    whoscored_id,
  }) {
    this.id = id;
    this.club = club;
    this.football_league_id = football_league_id;
    this.league = league;
    this.name = name;
    this.points = points;
    this.position = position;
    this.shirt = shirt;
    this.whoscored_id = whoscored_id;
  }
}
export class TransferRequest {
  constructor({ round_id, position, from, to }) {
    this.round_id = round_id;
    this.position = position;
    this.from = from;
    this.to = to;
  }
}
