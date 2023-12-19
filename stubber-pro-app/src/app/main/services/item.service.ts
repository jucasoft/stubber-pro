import {Injectable} from '@angular/core';
import {Item} from '@models/vo/item';
import {environment} from '../../../environments/environment';
import {BaseCrudService} from 'ngrx-entity-crud';
import {BasePathMethodsCrudService} from "@services/base-path-methods-crud-service";
import {ItemDTO} from "@models/vo/item.DTO";

@Injectable({
	providedIn: 'root'
})
export class ItemService extends BasePathMethodsCrudService<Item> {
	public override service = environment.webServiceUri + 'item';
  override getId = Item.selectId;
  override dtoKeys = Object.keys(new ItemDTO());

}
