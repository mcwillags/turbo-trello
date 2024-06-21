import { AxiosResponse } from "axios";

import { appAxios } from "~core/axios.ts";

import { ICreateList, IUpdateList, ListResponse, ListsResponse } from "./ListApiTypes.ts";

export class ListApi {
  static getLists(boardId: number): Promise<AxiosResponse<ListsResponse>> {
    return appAxios.post("/lists/get", { boardId });
  }

  static createList(data: ICreateList): Promise<AxiosResponse<ListResponse>> {
    return appAxios.post("/lists", data);
  }

  static updateList(data: IUpdateList): Promise<AxiosResponse<ListResponse>> {
    return appAxios.put(`/lists/${data.id}`, data);
  }

  static deleteList(id: number): Promise<AxiosResponse<void>> {
    return appAxios.delete(`/lists/${id}`);
  }
}
