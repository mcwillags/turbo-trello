import { Injectable } from "@nestjs/common";

import { IChangeTaskList } from "~features/task/application/interfaces/IChangeTaskList";
import { ICreateTask } from "~features/task/application/interfaces/ICreateTask";
import { ITaskRepository } from "~features/task/application/interfaces/ITaskRepository";
import { IUpdateTask } from "~features/task/application/interfaces/IUpdateTask";
import { TaskMapper } from "~features/task/application/mappers/TaskMapper";
import { Task } from "~features/task/domain/TaskEntity";
import { PrismaService } from "~prisma/PrismaService";

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.task;
  }

  async changeList(id: number, dto: IChangeTaskList): Promise<Task> {
    const updatedTask = await this.collection.update({ where: { id }, data: { listId: dto.listId } });

    return TaskMapper.toEntity(updatedTask);
  }

  async create(dto: ICreateTask): Promise<Task> {
    const newTask = await this.collection.create({
      data: {
        title: dto.title,
        listId: dto.listId,
        userId: dto.userId,
      },
    });

    return TaskMapper.toEntity(newTask);
  }

  async delete(id: number): Promise<void> {
    await this.collection.delete({ where: { id } });
  }

  async getById(id: number): Promise<Task | null> {
    const task = await this.collection.findUnique({ where: { id } });

    if (!task) return null;

    return TaskMapper.toEntity(task);
  }

  async getManyByListId(listId: number): Promise<Task[]> {
    const tasks = await this.collection.findMany({ where: { listId } });

    return tasks.map(TaskMapper.toEntity);
  }

  async update(id: number, dto: IUpdateTask): Promise<Task> {
    const updatedTask = await this.collection.update({ where: { id }, data: { ...dto } });

    return TaskMapper.toEntity(updatedTask);
  }
}
