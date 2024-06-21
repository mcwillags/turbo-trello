import { IQuery } from "~common/application/interfaces/IQuery";
import { GetListDto } from "~features/list/application/dto/GetListDto";
import { GetListResponse } from "~features/list/application/responses/GetListResponse";

export abstract class IGetListQuery extends IQuery<GetListDto, GetListResponse> {}
