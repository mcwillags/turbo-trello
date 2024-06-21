import { Task } from "../../domain/TaskEntity";

import { IChangeTaskList } from "./IChangeTaskList";
import { ICreateTask } from "./ICreateTask";
import { IUpdateTask } from "./IUpdateTask";

export interface ITaskRepository {
  create(dto: ICreateTask): Promise<Task>;

  update(id: number, dto: IUpdateTask): Promise<Task>;

  changeList(id: number, dto: IChangeTaskList): Promise<Task>;

  delete(id: number): Promise<void>;

  getById(id: number): Promise<Task | null>;

  getManyByListId(listId: number): Promise<Task[]>;
}
