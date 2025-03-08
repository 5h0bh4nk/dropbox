import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFiles } from "../api/fileService";

export const fetchFiles = createAsyncThunk("files/fetch", async () => {
  const response = await getFiles();
  console.log('fetched', response)
  return response.data;
});

const fileSlice = createSlice({
  name: "files",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.pending, (state) => { state.loading = true; });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
  },
});

export default fileSlice.reducer;