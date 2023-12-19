import {ItemDTO} from "@models/vo/item.DTO";

export class Item extends ItemDTO{
  static override selectId: (item: Item) => string = (item:Item) => ItemDTO.selectId(item);
}
