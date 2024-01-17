export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string | null;
}

export interface Criteria {
  id: number;
  name: string;
}

export interface CriteriaValue {
  id: number;
  criteria_id: number;
  value: string;
}

export interface Consumer {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  gender: 'male' | 'female' | 'other';
  country: string;
  created_at: Date;
}

export interface Command {
  id: number;
  created_at: Date;
  consumer_id: number;
  totalAmount: number;
  totalQuantity: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CommandLine {
  id: number;
  command_id: number;
  product_id: number;
  quantity: number;
  unity_price: number;
  total_price: number;
}

export interface ConsumerValue {
  consumer_id: number;
  criteria_value_id: number;
}

export interface ProductValue {
  product_id: number;
  criteria_value_id: number;
}
export interface Database {
  product: Product;
  criteria: Criteria;
  criteria_value: CriteriaValue;
  consumer: Consumer;
  command: Command;
  command_line: CommandLine;
  consumer_value: ConsumerValue;
  product_value: ProductValue;
}
