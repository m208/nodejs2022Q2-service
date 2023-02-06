import { Injectable } from '@nestjs/common';

@Injectable()
export class DBFavs {
  private readonly entities: Array<string> = [];

  getAll() {
    return this.entities;
  }

  findOne(item: string) {
    const entry = this.entities.find((el) => el === item);
    return entry ? entry : null;
  }

  addItem(item: string) {
    this.entities.push(item);
    return item;
  }

  removeItem(item: string) {
    const index = this.entities.findIndex((el) => el === item);
    const itemExisted = index >= 0;
    if (itemExisted) {
      this.entities.splice(index, 1);
    }
    return itemExisted;
  }
}
