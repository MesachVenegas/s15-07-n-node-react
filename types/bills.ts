export interface BillProps {
  id?: string;
  name: string;
  amount: number;
  owner: string;
  goalId: string;
  categoryId: string;
  createdDate?: Date;
}``