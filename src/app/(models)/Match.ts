export default class Match {
  constructor(
    public user_id: string,
    public listing_id: number,
    public createdAt: string,
    public _id?: string,
  ) {}
}
