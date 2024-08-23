import { createSlice } from '@reduxjs/toolkit';

export const templateSlice = createSlice({
  name: 'templates',
  initialState: [],
  reducers: {
    setTemplates: (state, action) => action.payload,
    addTemplate: (state, action) => [...state, action.payload],
    editTemplate: (state, action) => {
      const { id, content } = action.payload;
      const index = state.findIndex(template => template.id === id);
      if (index !== -1) state[index].content = content;
    },
    removeTemplate: (state, action) => state.filter(template => template.id !== action.payload),
  },
});

export const { setTemplates, addTemplate, editTemplate, removeTemplate } = templateSlice.actions;

export default templateSlice.reducer;
