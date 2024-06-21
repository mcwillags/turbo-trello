import { IList } from "~types/List.ts";

export interface ICreateList {
  boardId: number;
  title: string;
}

export interface IUpdateList {
  id: number;
  title: string;
}

export interface IDeleteList {
  id: number;
  boardId: number;
}
// Responses

export interface ListResponse {
  list: IList;
}

export interface ListsResponse {
  lists: IList[];
}
