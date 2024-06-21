import { ListDto } from "~features/list/application/dto/ListDto";

export class GetListResponse {
  constructor(public readonly list: ListDto) {}
}
