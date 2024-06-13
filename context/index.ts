import { configureStore } from '@reduxjs/toolkit';

import BillOfCategory from '@/context/store/steps/addBillToCategory';

export const store = configureStore({
  reducer: {
    BillOfCategory
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
