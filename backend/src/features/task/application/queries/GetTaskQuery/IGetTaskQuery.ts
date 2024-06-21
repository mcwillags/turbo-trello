import { IQuery } from "~common/application/interfaces/IQuery";
import { GetTaskDto } from "~features/task/application/dto/GetTaskDto";
import { GetTaskRepsonse } from "~features/task/application/responses/GetTaskRepsonse";

export abstract class IGetTaskQuery extends IQuery<GetTaskDto, GetTaskRepsonse> {}
