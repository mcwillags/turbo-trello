import { makeAutoObservable } from "mobx";

import { ListApi } from "../api/list/ListApi.ts";
import { ICreateList, IDeleteList, IUpdateList } from "../api/list/ListApiTypes.ts";
import { IList } from "~types/List.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";

export class ListStore {
  private _lists: Record<number, IList[]> = {};

  constructor() {
    makeAutoObservable(this);
  }

  get lists() {
    return this._lists;
  }

  setLists(lists: IList[], boardId: number) {
    this._lists = { [boardId]: lists };
  }

  addList(list: IList, boardId: number) {
    this._lists[boardId] = [...this._lists[boardId], list];
  }

  setDeletedList(listId: number, boardId: number) {
    this._lists[boardId] = this._lists[boardId].filter((list) => list.id !== listId);
  }

  setUpdatedList(list: IList, boardId: number) {
    this._lists[boardId] = this._lists[boardId].map((prevList) => (prevList.id === list.id ? list : prevList));
  }

  getMappableLists(boardId: number): IList[] {
    return this._lists[boardId] ?? [];
  }

  async getLists(boardId: number, onSuccess?: OnSuccessCallback<IList[]>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await ListApi.getLists(boardId);

      this.setLists(data.lists, boardId);

      if (onSuccess) onSuccess(data.lists);
    } catch (error) {
      if (onError) onError();
    }
  }

  async createList(body: ICreateList, onSuccess?: OnSuccessCallback<IList>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await ListApi.createList(body);

      this.addList(data.list, body.boardId);

      if (onSuccess) onSuccess(data.list);
    } catch (error) {
      if (onError) onError();
    }
  }

  async updateList(body: IUpdateList, onSuccess?: OnSuccessCallback<IList>, onError?: OnErrorCallback<void>) {
    try {
      const { data } = await ListApi.updateList(body);

      this.setUpdatedList(data.list, data.list.boardId);

      if (onSuccess) onSuccess(data.list);
    } catch (error) {
      if (onError) onError();
    }
  }

  async deleteList({ id, boardId }: IDeleteList, onSuccess?: OnSuccessCallback<void>, onError?: OnErrorCallback<void>) {
    try {
      await ListApi.deleteList(id);

      this.setDeletedList(id, boardId);

      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError();
    }
  }
}
