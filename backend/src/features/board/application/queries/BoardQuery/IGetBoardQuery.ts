import { IQuery } from "~common/application/interfaces/IQuery";
import { GetBoardDto } from "~features/board/application/dto/GetBoardDto";
import { GetBoardResponse } from "~features/board/application/responses/GetBoardResponse";

export abstract class IGetBoardQuery extends IQuery<GetBoardDto, GetBoardResponse> {}
