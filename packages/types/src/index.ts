export * from './database';
export * from './cocktail-detail';
export * from './auth-login';
export * from './auth-register';
export * from './cocktail-form';

export type User = {
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
