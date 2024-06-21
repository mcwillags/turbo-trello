import { ListDto } from "~features/list/application/dto/ListDto";

export class GetListsResponse {
  constructor(public readonly lists: ListDto[]) {}
}
