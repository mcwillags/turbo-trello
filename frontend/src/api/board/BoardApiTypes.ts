// Requests

import { IBoard } from "~types/Board.ts";

export interface ICreateBoard {
  title: string;
}

export interface IUpdateBoard {
  id: number;
  title: string;
}

// Responses

export interface BoardsResponse {
  boards: IBoard[];
}

export interface BoardResponse {
  board: IBoard;
}
