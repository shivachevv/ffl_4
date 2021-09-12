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
