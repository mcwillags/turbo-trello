import { ICreateBoard } from "~features/board/application/interfaces/ICreateBoard";
import { IUpdateBoard } from "~features/board/application/interfaces/IUpdateBoard";
import { Board } from "~features/board/domain/BoardEntity";

export interface IBoardRepository {
  create(dto: ICreateBoard): Promise<Board>;

  getManyByUserId(userId: number): Promise<Board[]>;

  update(id: number, dto: IUpdateBoard): Promise<Board>;

  delete(id: number): Promise<void>;

  getById(id: number): Promise<Board | null>;
}
