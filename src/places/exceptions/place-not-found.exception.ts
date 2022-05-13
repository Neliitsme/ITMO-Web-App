import {NotFoundException} from "@nestjs/common";

export class PlaceNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Place with id ${id} not found`);
  }
}