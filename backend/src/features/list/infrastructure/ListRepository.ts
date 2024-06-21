import { Injectable } from "@nestjs/common";

import { ICreateList } from "~features/list/application/interfaces/ICreateList";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { IUpdateList } from "~features/list/application/interfaces/IUpdateList";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { List } from "~features/list/domain/ListEntity";
import { PrismaService } from "~prisma/PrismaService";

@Injectable()
export class ListRepository implements IListRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.list;
  }

  async create(dto: ICreateList): Promise<List> {
    const newList = await this.collection.create({
      data: {
        title: dto.title,
        userId: dto.userId,
        boardId: dto.boardId,
      },
    });

    return ListMapper.toEntity(newList);
  }

  async delete(id: number): Promise<void> {
    await this.collection.delete({ where: { id } });
  }

  async getById(id: number): Promise<List | null> {
    const list = await this.collection.findUnique({ where: { id } });

    if (!list) return null;

    return ListMapper.toEntity(list);
  }

  async getManyByBoardId(boardId: number): Promise<List[]> {
    const lists = await this.collection.findMany({ where: { boardId } });

    return lists.map(ListMapper.toEntity);
  }

  async update(id: number, dto: IUpdateList): Promise<List> {
    const updatedList = await this.collection.update({ where: { id }, data: { ...dto } });

    return ListMapper.toEntity(updatedList);
  }
}
