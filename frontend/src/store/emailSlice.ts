import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../api/apiClient";

interface EmailState {
  emails: string[];
  loading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  emails: [],
  loading: false,
  error: null,
};

export const sendEmails = createAsyncThunk(
  "emails/sendEmails",
  async (data: { emails: string[]; template: string }) => {
    await apiCall<void>("/email/send", { method: "POST", data });
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmails.fulfilled, (state) => {
        state.emails = [];
        state.loading = false;
      })
      .addCase(sendEmails.rejected, (state, action) => {
        state.error = action.error.message || "Failed to send emails";
        state.loading = false;
      });
  },
});

export const { setEmails } = emailSlice.actions;
export default emailSlice.reducer;
