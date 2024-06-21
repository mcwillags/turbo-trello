import { AxiosResponse } from "axios";

import { appAxios } from "~core/axios.ts";

import { IChangeTaskList, ICreateTask, IUpdateTask, TaskResponse, TasksResponse } from "./TaskApiTypes.ts";

export class TaskApi {
  static getTasks(listId: number): Promise<AxiosResponse<TasksResponse>> {
    return appAxios.post("/tasks/get", { listId });
  }

  static createTask(data: ICreateTask): Promise<AxiosResponse<TaskResponse>> {
    return appAxios.post("/tasks", data);
  }

  static updateTask(data: IUpdateTask): Promise<AxiosResponse<TaskResponse>> {
    return appAxios.put(`/tasks/${data.id}`, data);
  }

  static changeTaskList(data: Omit<IChangeTaskList, "oldListId">): Promise<AxiosResponse<TaskResponse>> {
    return appAxios.patch(`/tasks/${data.id}`, data);
  }

  static deleteTask(id: number): Promise<AxiosResponse<void>> {
    return appAxios.delete(`/tasks/${id}`);
  }
}
