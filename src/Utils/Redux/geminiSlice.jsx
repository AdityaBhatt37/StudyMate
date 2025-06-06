import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
  name: "gemini",
  initialState: {
    geminiNames: null,
    youtubeVideos: null,
   
  },

  reducers: {
    addGeminiNamesAndYoutbeVideos: (state, action) => {
      const { geminiNames, youtubeVideos } = action.payload;
      state.geminiNames = geminiNames;
      state.youtubeVideos = youtubeVideos;
    },


  },
});

export const { addGeminiNamesAndYoutbeVideos, addGeminiExplanation } = geminiSlice.actions;
export default geminiSlice.reducer;
