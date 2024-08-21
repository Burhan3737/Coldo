import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../api/apiClient";

interface Template {
  _id: string;
  name: string;
  content: string;
}

interface TemplateState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templates: [],
  loading: false,
  error: null,
};

export const fetchTemplates = createAsyncThunk(
  "templates/fetchTemplates",
  async () => {
    return apiCall<Template[]>("/templates");
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (id: string) => {
    await apiCall<void>(`/templates/${id}`, { method: "DELETE" });
    return id;
  }
);

export const createTemplate = createAsyncThunk(
  "templates/createTemplate",
  async (template: Template) => {
    return apiCall<Template>("/templates", { method: "POST", data: template });
  }
);

export const updateTemplate = createAsyncThunk(
  "templates/updateTemplate",
  async (template: Template) => {
    return apiCall<Template>(`/templates/${template._id}`, {
      method: "PUT",
      data: template,
    });
  }
);

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
        state.loading = false;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch templates";
        state.loading = false;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.filter(
          (template) => template._id !== action.payload
        );
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload);
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.map((template) =>
          template._id === action.payload._id ? action.payload : template
        );
      });
  },
});

export default templateSlice.reducer;
