import { ICreateList } from "~features/list/application/interfaces/ICreateList";
import { IUpdateList } from "~features/list/application/interfaces/IUpdateList";
import { List } from "~features/list/domain/ListEntity";

export interface IListRepository {
  getById(id: number): Promise<List | null>;

  getManyByBoardId(boardId: number): Promise<List[]>;

  create(dto: ICreateList): Promise<List>;

  delete(id: number): Promise<void>;

  update(id: number, dto: IUpdateList): Promise<List>;
}
