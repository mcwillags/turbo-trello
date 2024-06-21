import { ListDto } from "~features/list/application/dto/ListDto";

export class CreateListResponse {
  constructor(public readonly list: ListDto) {}
}
