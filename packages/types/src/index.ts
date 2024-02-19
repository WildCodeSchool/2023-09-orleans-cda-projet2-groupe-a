export * from './database';
export * from './auth-login';
export * from './auth-register';
export * from './cocktail-form';
export * from './profile';

export type User = {
  id: number;
  name: string;
  email: string;
};

export interface SomeInterface {
  someProperty: string;
}
