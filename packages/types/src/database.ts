import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface ProductTable {
  id: Generated<number>;
  name: string;
  brand: string;
  category: string;
  image: string | null;
}

export interface CriteriaTable {
  id: Generated<number>;
  name: string;
}

export interface CriteriaValueTable {
  id: Generated<number>;
  criteria_id: number;
  value: string;
}

export interface ConsumerTable {
  id: Generated<number>;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  gender: 'male' | 'female' | 'other';
  country: string;
  created_at: Date;
}

export interface CommandTable {
  id: Generated<number>;
  created_at: Date;
  consumer_id: number;
  totalAmount: number;
  totalQuantity: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CommandLineTable {
  id: Generated<number>;
  command_id: number;
  product_id: number;
  quantity: number;
  unity_price: number;
  total_price: number;
}

export interface ConsumerValueTable {
  consumer_id: number;
  criteria_value_id: number;
}

export interface ProductValueTable {
  product_id: number;
  criteria_value_id: number;
}
export interface Database {
  product: ProductTable;
  criteria: CriteriaTable;
  criteria_value: CriteriaValueTable;
  consumer: ConsumerTable;
  command: CommandTable;
  command_line: CommandLineTable;
  consumer_value: ConsumerValueTable;
  product_value: ProductValueTable;
}

export type Product = Selectable<ProductTable>;
export type NewProduct = Insertable<ProductTable>;
export type ProductUpdate = Updateable<ProductTable>;

export type Criteria = Selectable<CriteriaTable>;
export type NewCriteria = Insertable<CriteriaTable>;
export type CriteriaUpdate = Updateable<CriteriaTable>;

export type CriteriaValue = Selectable<CriteriaValueTable>;
export type NewCriteriaValue = Insertable<CriteriaValueTable>;
export type CriteriaValueUpdate = Updateable<CriteriaValueTable>;

export type Consumer = Selectable<ConsumerTable>;
export type NewConsumer = Insertable<ConsumerTable>;
export type ConsumerUpdate = Updateable<ConsumerTable>;

export type Command = Selectable<CommandTable>;
export type NewCommand = Insertable<CommandTable>;
export type CommandUpdate = Updateable<CommandTable>;

export type CommandLine = Selectable<CommandLineTable>;
export type NewCommandLine = Insertable<CommandLineTable>;
export type CommandLineUpdate = Updateable<CommandLineTable>;

export type ProductValue = Selectable<ProductValueTable>;
export type NewProductValue = Insertable<ProductValueTable>;
export type ProductValueUpdate = Updateable<ProductValueTable>;
