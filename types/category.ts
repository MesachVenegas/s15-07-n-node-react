import { BillProps } from "./bills";

export interface CategoryProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  owner?: string | null;
  default: boolean;
  createdDate: Date;
  bills?: BillProps[];
}