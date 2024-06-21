import { Inject, Injectable, Scope } from "@nestjs/common";

import { ListNotFoundError } from "../../errors/ListNotFoundError";
import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { GetListDto } from "~features/list/application/dto/GetListDto";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { IGetListQuery } from "~features/list/application/queries/GetListQuery/IGetListQuery";
import { GetListResponse } from "~features/list/application/responses/GetListResponse";
import { ListRepositoryToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetListQuery implements IGetListQuery {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: GetListDto): Promise<GetListResponse> {
    const list = await this._listRepository.getById(dto.id);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    return new GetListResponse(ListMapper.toDto(list));
  }
}
