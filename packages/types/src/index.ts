export * from './database';
export * from './auth';
export * from './cocktail-detail';
export * from './cocktail-form';
export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
