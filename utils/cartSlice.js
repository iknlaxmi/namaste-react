import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Redux tool kit uses immer BTS
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearItem: (state, action) => {
      //RTK either mutate existing state or return new state
      //state.items.length = 0;
      return { items: [] };
    },
  },
});
export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
