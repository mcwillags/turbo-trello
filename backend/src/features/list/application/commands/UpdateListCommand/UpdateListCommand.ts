import { Inject } from "@nestjs/common";

import { ListNotFoundError } from "../../errors/ListNotFoundError";
import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { IUpdateListCommand } from "~features/list/application/commands/UpdateListCommand/IUpdateListCommand";
import { UpdateListDto } from "~features/list/application/dto/UpdateListDto";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { UpdateListResponse } from "~features/list/application/responses/UpdateListResponse";
import { ListRepositoryToken } from "~features/list/diTokens";

export class UpdateListCommand implements IUpdateListCommand {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: UpdateListDto): Promise<UpdateListResponse> {
    const list = await this._listRepository.getById(dto.id);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    const updatedList = await this._listRepository.update(dto.id, {
      title: dto.title,
    });

    return new UpdateListResponse(ListMapper.toDto(updatedList));
  }
}
