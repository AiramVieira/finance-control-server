import type { Currency } from "./currency";

export interface Finances {
  amount: number;
  currency: Currency;
  description: string;
  date: Date;
  secretKey: string;
}
