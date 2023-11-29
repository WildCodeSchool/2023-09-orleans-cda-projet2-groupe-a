export * from './database';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}

export type Inputs = {
  name?: string;
  nameRequired?: string;
  topping?: string;
  ingredient?: string;
  alcohol?: string;
  level?: number;
  glass?: string;
};
