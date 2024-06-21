import { makeAutoObservable } from "mobx";

import { BoardApi } from "../api/board/BoardApi.ts";
import { ICreateBoard, IUpdateBoard } from "../api/board/BoardApiTypes.ts";
import { IBoard } from "~types/Board.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";

export class BoardStore {
  private _boards: IBoard[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get boards() {
    return this._boards;
  }

  setBoards(boards: IBoard[]) {
    this._boards = boards;
  }

  addBoard(board: IBoard) {
    this._boards.push(board);
  }

  setDeletedBoard(boardId: number) {
    this._boards = this.boards.filter((board) => board.id !== boardId);
  }

  setUpdatedBoard(board: IBoard) {
    this._boards = this.boards.map((prevBoard) => (prevBoard.id === board.id ? board : prevBoard));
  }

  async getBoards(onSuccess?: OnSuccessCallback<IBoard[]>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await BoardApi.getBoards();

      this.setBoards(data.boards);

      if (onSuccess) onSuccess(data.boards);
    } catch (error) {
      if (onError) onError();
    }
  }

  async createBoard(body: ICreateBoard, onSuccess?: OnSuccessCallback<IBoard>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await BoardApi.createBoard(body);

      this.addBoard(data.board);

      if (onSuccess) onSuccess(data.board);
    } catch (error) {
      if (onError) onError();
    }
  }

  async updateBoard(body: IUpdateBoard, onSuccess?: OnSuccessCallback<IBoard>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await BoardApi.updateBoard(body);

      this.setUpdatedBoard(data.board);

      if (onSuccess) onSuccess(data.board);
    } catch (error) {
      if (onError) onError();
    }
  }

  async deleteBoard(id: number, onSuccess?: OnSuccessCallback<void>, onError?: OnErrorCallback<void>) {
    try {
      await BoardApi.deleteBoard(id);

      this.setDeletedBoard(id);

      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError();
    }
  }
}
