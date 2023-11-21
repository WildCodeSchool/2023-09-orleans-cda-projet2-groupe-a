import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface ItemTable {
  id: Generated<number>;
  content: string;
}

export type Item = Selectable<ItemTable>;
export type NewItem = Insertable<ItemTable>;
export type ItemUpdate = Updateable<ItemTable>;

export interface Database {
  item: ItemTable;
}
