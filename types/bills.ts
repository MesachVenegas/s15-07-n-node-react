export interface BillProps {
  id?: string;
  name: string;
  amount: number;
  owner: string;
  goalId: string;
  categoryId: string;
  createdDate?: Date;
}

export interface BillStateProps {
  id?: string;
  name: string;
  amount: number;
  categoryId: string;
  icon: string;
}

export interface BillCategoryStateProps {
  target: string;
  id: string;
  category: string;
  icon: string;
  variant: string;
  bills: BillStateProps[];
}

export interface DefaultBillProps {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
  categoryId: string;
}