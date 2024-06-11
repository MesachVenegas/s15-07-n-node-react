import { create } from 'zustand';

// expected bill properties
interface Bill {
  name: string;
  amount: number;
  icon: string;
}

// expected category properties
interface Category {
  category: string;
  bills: Bill[];
}

// interface to store actions.
interface BillCategoriesState {
  categories: Category[];
  addCategory: (catName: string) => void;
  removeCategory: (catName: string) => void;
  addBillToCategory: (catName: string, bill: Bill) => void;
  removeBillFromCategory: (catName: string, bill: Bill) => void;
  addBill: (bill: Bill) => void;
}



export const useBillCategories = create<BillCategoriesState>(set => ({
  // initial state
  categories: [],
  // add new category
  addCategory: (catName) => set(state => ({
    categories: [...state.categories, { category: catName, bills: [] }]
  })),
  // remove a category
  removeCategory: (catName) => set(state => ({
    categories: state.categories.filter(cat => cat.category !== catName)
  })),
  // add a bill to a category
  addBillToCategory: (catName, bill) => set(state => ({
    categories: state.categories.map(
      cat => cat.category === catName
        ? { ...cat, bills: [...cat.bills, bill] }
        : cat
    )
  })),
  // remove a bill from a category
  removeBillFromCategory: (catName, bill) => set( state => ({
    categories: state.categories.map(
      cat => cat.category === catName
        ? { ...cat, bills: cat.bills.filter(b => b.name !== bill.name) }
        : cat
    )
  })),
  // add a new bill without category
  addBill: (bill) => set( state => ({
    categories: [
      ...state.categories,
      {
        category: 'Uncategorized',
        bills: [...state.categories.find(cat => cat.category === 'Uncategorized')?.bills || [], bill ]
      }
    ]
  }))
}))