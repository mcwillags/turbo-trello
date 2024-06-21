import { ITask } from "~types/Task.ts";

export interface ICreateTask {
  listId: number;
  title: string;
}

export interface IUpdateTask {
  id: number;
  title: string;
}

export interface IDeleteList {
  id: number;
  listId: number;
}

export interface IChangeTaskList {
  id: number;
  oldListId: number;
  listId: number;
}

// Responses

export interface TaskResponse {
  task: ITask;
}

export interface TasksResponse {
  tasks: ITask[];
}
