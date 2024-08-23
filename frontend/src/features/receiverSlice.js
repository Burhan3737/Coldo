import { createSlice } from '@reduxjs/toolkit';

export const receiverSlice = createSlice({
  name: 'receivers',
  initialState: [],
  reducers: {
    setReceivers: (state, action) => action.payload,
    addReceiver: (state, action) => [...state, action.payload],
    updateReceiver: (state, action) => {
      const { index, email } = action.payload;
      state[index] = email;
    },
    removeReceiver: (state, action) => state.filter((_, i) => i !== action.payload),
  },
});

export const { setReceivers, addReceiver, updateReceiver, removeReceiver } = receiverSlice.actions;

export default receiverSlice.reducer;
