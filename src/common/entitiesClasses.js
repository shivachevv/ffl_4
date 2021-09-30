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

export class FootballPlayer {
  constructor({ id, club, football_league_id, league, name, points, position, shirt, whoscored_id }) {
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
