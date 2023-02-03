import { Injectable } from '@nestjs/common';

interface Options<T, K extends keyof T> {
  key: K;
  equals?: T[K];
}
type OptionsEquals<T, K extends keyof T> = Required<
  Pick<Options<T, K>, 'key' | 'equals'>
>;

@Injectable()
export abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  entities: Array<Entity> = [];

  abstract create(createDto: CreateDTO): Promise<Entity>;

  findMany<K extends keyof Entity>(
    options: OptionsEquals<Entity, K>,
  ): Array<Entity> {
    return (
      [...this.entities].filter(
        (entity) => entity[options.key] === options.equals,
      ) ?? null
    );
  }

  findAll() {
    return this.entities;
  }

  delete(id: string) {
    const index = this.entities.findIndex((el) => el.id === id);
    if (index >= 0) {
      this.entities.splice(index, 1);
    }
  }

  findOne(id: string): Entity {
    const item = this.entities.find((el) => el.id === id);
    return item;
  }

  async update(id: string, updateDto: ChangeDTO): Promise<Entity> {
    const index = this.entities.findIndex((el) => el.id === id);
    if (index >= 0) {
      const changed = { ...this.entities[index], ...updateDto };
      this.entities.splice(index, 1, changed);
      return changed;
    }
  }
}
