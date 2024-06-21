export class BoardDto {
  constructor(
    public id: number,
    public title: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
