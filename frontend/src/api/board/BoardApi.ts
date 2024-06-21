import { AxiosResponse } from "axios";

import { appAxios } from "~core/axios.ts";

import { BoardResponse, BoardsResponse, ICreateBoard, IUpdateBoard } from "./BoardApiTypes.ts";

export class BoardApi {
  static createBoard(data: ICreateBoard) {
    return appAxios.post("/boards", data);
  }

  static getBoards(): Promise<AxiosResponse<BoardsResponse>> {
    return appAxios.post("/boards/get");
  }

  static updateBoard(data: IUpdateBoard): Promise<AxiosResponse<BoardResponse>> {
    return appAxios.put("/boards/" + data.id, data);
  }

  static deleteBoard(boardId: number) {
    return appAxios.delete("/boards/" + boardId);
  }
}
