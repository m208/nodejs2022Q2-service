import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  entities: Array<Entity> = [];

  abstract create(createDto: CreateDTO): Promise<Entity>;

  findAll(): Array<Entity> {
    return this.entities;
  }
}
