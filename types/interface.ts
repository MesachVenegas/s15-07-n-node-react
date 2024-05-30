export interface Session {
  id: string;
  username: string;
  email: string;
  image: string;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface ChangePassword {
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPassword {
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  password?: string | null;
  
}

export interface Setting {
  id: string;
  currency: string;
  notify: string;
  userId: string;
}

export interface Report {
  id: string;
  owner:string;
  period: string;
  outcome: number;
  income: number;
  balance: number;
}

export interface Transaction {
  id: string;
  owner: string;
  type: string;
  name: string;
  icon: string;
  payMethod:string;
  amount: number;
  comment?: string | null;
}
