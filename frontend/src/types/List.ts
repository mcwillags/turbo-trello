export interface IList {
  id: number;
  title: string;
  boardId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IListStorage {
  boardId: number;
  list: IList;
}
