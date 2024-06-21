import { ListDto } from "~features/list/application/dto/ListDto";

export class UpdateListResponse {
  constructor(public readonly list: ListDto) {}
}
