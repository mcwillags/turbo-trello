import { IQuery } from "~common/application/interfaces/IQuery";
import { GetBoardsDto } from "~features/board/application/dto/GetBoardsDto";
import { GetBoardsResponse } from "~features/board/application/responses/GetBoardsResponse";

export abstract class IGetBoardsQuery extends IQuery<GetBoardsDto, GetBoardsResponse> {}
