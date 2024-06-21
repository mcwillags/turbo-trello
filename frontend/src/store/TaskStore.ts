import { makeAutoObservable } from "mobx";

import { TaskApi } from "../api/tasks/TaskApi.ts";
import { IChangeTaskList, ICreateTask, IDeleteList, IUpdateTask } from "../api/tasks/TaskApiTypes.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";
import { ITask } from "~types/Task.ts";

export class TaskStore {
  private _tasks: Record<number, ITask[]> = {};

  constructor() {
    makeAutoObservable(this);
  }

  getMappableTasks(listId: number) {
    return this._tasks[listId] ?? [];
  }

  getTask(id: number, listId: number) {
    return this._tasks[listId].find((task) => task.id === id);
  }

  setTasks(tasks: ITask[], listId: number) {
    this._tasks[listId] = tasks;
  }

  addTask(task: ITask, listId: number) {
    this._tasks[listId] = [...this._tasks[listId], task];
  }

  setChangedListTask(task: ITask, oldListId: number, newListId: number) {
    this._tasks[oldListId] = this._tasks[oldListId].filter((prevTask) => prevTask.id !== task.id);
    this._tasks[newListId] = [...this._tasks[newListId], task];
  }

  setDeletedTask(id: number, listId: number) {
    this._tasks[listId] = this._tasks[listId].filter((task) => task.id !== id);
  }

  setUpdatedTask(task: ITask, listId: number) {
    this._tasks[listId] = this._tasks[listId].map((prevTask) => (prevTask.id === task.id ? task : prevTask));
  }

  async getTasks(listId: number, onSuccess?: OnSuccessCallback<ITask[]>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await TaskApi.getTasks(listId);

      this.setTasks(data.tasks, listId);

      if (onSuccess) onSuccess(data.tasks);
    } catch (error) {
      if (onError) onError();
    }
  }

  async createTask(body: ICreateTask, onSuccess?: OnSuccessCallback<ITask>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await TaskApi.createTask(body);

      this.addTask(data.task, data.task.listId);

      if (onSuccess) onSuccess(data.task);
    } catch (error) {
      if (onError) onError();
    }
  }

  async updateTask(body: IUpdateTask, onSuccess?: OnSuccessCallback<ITask>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await TaskApi.updateTask(body);

      this.setUpdatedTask(data.task, data.task.listId);

      if (onSuccess) onSuccess(data.task);
    } catch (error) {
      if (onError) onError();
    }
  }

  async changeTaskList(body: IChangeTaskList, onSuccess?: OnSuccessCallback<ITask>, onError?: OnErrorCallback<void>) {
    const task = this.getTask(body.id, body.oldListId);

    if (!task) {
      if (onError) onError();
      return;
    }

    this.setChangedListTask({ ...task, listId: body.listId }, body.oldListId, body.listId);

    try {
      const { data } = await TaskApi.changeTaskList(body);

      if (onSuccess) onSuccess(data.task);
    } catch (error) {
      if (onError) onError();
    }
  }

  async deleteTask(body: IDeleteList, onSuccess?: OnSuccessCallback<void>, onError?: OnErrorCallback<void>) {
    try {
      await TaskApi.deleteTask(body.id);

      this.setDeletedTask(body.id, body.listId);

      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError();
    }
  }
}
