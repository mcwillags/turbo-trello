import { IQuery } from "~common/application/interfaces/IQuery";
import { GetListsDto } from "~features/list/application/dto/GetListsDto";
import { GetListsResponse } from "~features/list/application/responses/GetListsResponse";

export abstract class IGetListsQuery extends IQuery<GetListsDto, GetListsResponse> {}
