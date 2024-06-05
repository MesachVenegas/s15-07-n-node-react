export interface Session {
  id: string;
  username: string;
  email: string;
  image: string;
  token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps {
  id?: string;
  username: string;
  email: string;
  image?: string | null;
  password?: string | null;
  registryDate?: Date;
}

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

export interface ChangePasswordProps {
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordProps {
  email: string;
}

export interface SettingProps {
  currency: string;
  notify: boolean;
  userId: string;
}

export interface ReportProps {
  owner:string;
  period: string;
  outcome: number;
  income: number;
  balance: number;
}

export interface TransactionProps {
  owner: string;
  type: string;
  name: string;
  icon: string;
  payMethod:string;
  amount: number;
  comment?: string | null;
}
