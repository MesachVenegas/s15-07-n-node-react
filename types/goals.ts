export interface GoalsProps {
  id: string;
  target: 'control' | 'buy' | 'investment' | 'emergency' | 'other';
  revenue: number;
  revenues?: string[];
  bills?: string[];
}

export interface CategoryProps{
  id: string;
  name: string;
  owner: string;
  createDate: Date;
  revenues?: string[];
  bills?: string[];
}

export interface BillProps {
  id: string;
  owner: string;
  name: string;
  amount: number;
  createDate: Date;
  categoryId?: string;
  goalId?: string;
}

export interface PlanProps {
  plan: 'control' | 'buy' | 'investment' | 'emergency' | 'other';
}