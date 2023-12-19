import {createCrudEntityAdapter, EntityCrudAdapter, EntityCrudState} from 'ngrx-entity-crud';
import {Item} from '@models/vo/item';

export const adapter: EntityCrudAdapter<Item> = createCrudEntityAdapter<Item>({
	selectId: model => Item.selectId(model),
});

export interface State extends EntityCrudState<Item> {
};

export const initialState: State = adapter.getInitialCrudState();
