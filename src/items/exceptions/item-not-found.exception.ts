import { NotFoundException } from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Item with id ${id} not found`);
  }
}
