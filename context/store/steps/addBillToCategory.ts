import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BillCategoryStateProps, BillStateProps } from '@/types/bills';

const initialState: BillCategoryStateProps[] = [];

export const BillOfCategorySlice = createSlice({
  name: 'BillOfCategory',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<BillCategoryStateProps>) => {
      const existingCategory = state.find(category => category.id === action.payload.id);
      if (!existingCategory) state.push(action.payload);
    },
    addBillToCategory: (state, action: PayloadAction<BillStateProps>) => {
      const category = state.filter(category => category.id === action.payload.categoryId);
      if (category) {
        const existingBill = state.find(bill => bill.id === action.payload.id)
        if (!existingBill) category[0].bills.push(action.payload);
      }
    }
  },
});

export const { addBillToCategory, addCategory } = BillOfCategorySlice.actions;

export default BillOfCategorySlice.reducer;
