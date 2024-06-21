import { Inject, Injectable, Scope } from "@nestjs/common";

import { ForbiddenError } from "~common/application/errors/ForbiddenError";
import { IDeleteListCommand } from "~features/list/application/commands/DeleteListCommand/IDeleteListCommand";
import { DeleteListDto } from "~features/list/application/dto/DeleteListDto";
import { ListNotFoundError } from "~features/list/application/errors/ListNotFoundError";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { DeleteListResponse } from "~features/list/application/responses/DeleteListResponse";
import { ListRepositoryToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class DeleteListCommand implements IDeleteListCommand {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  async execute(dto: DeleteListDto): Promise<DeleteListResponse> {
    const list = await this._listRepository.getById(dto.id);

    if (!list) throw new ListNotFoundError();

    if (list.userId !== dto.userId) throw new ForbiddenError();

    await this._listRepository.delete(dto.id);

    return new DeleteListResponse().withMessage("List was deleted successfully");
  }
}
