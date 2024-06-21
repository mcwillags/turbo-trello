import { IQuery } from "~common/application/interfaces/IQuery";
import { GetTasksDto } from "~features/task/application/dto/GetTasksDto";
import { GetTasksResponse } from "~features/task/application/responses/GetTasksResponse";

export abstract class IGetTasksQuery extends IQuery<GetTasksDto, GetTasksResponse> {}
