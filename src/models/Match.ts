enum Status {
  Pending = "Pending",
  Fulfilled = "Declined",
  Accepted = "Accepted",
}

export default class Match {
  user_id: string;
  listing_id: number;
  status: Status;

  constructor(
    user_id: string,
    listing_id: number,
    status: Status = Status.Pending,
  ) {
    this.user_id = user_id;
    this.listing_id = listing_id;
    this.status = status;
  }
}
