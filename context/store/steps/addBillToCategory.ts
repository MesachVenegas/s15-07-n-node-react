import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BillCategoryStateProps } from '@/types/bills';



const initialState: BillCategoryStateProps[] = [];

export const BillOfCategorySlice = createSlice({
  name: 'BillOfCategory',
  initialState,
  reducers: {
    addBillToCategory: (state, action: PayloadAction<BillCategoryStateProps>) => {
      state.push(action.payload);
    },
  },
});

export const { addBillToCategory } = BillOfCategorySlice.actions;

export default BillOfCategorySlice.reducer;