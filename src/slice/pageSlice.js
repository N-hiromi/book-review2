import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isPage: 1,
  isOffset: 0
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    //書籍一覧画面のページネーション処理
    updatePage: (state, newPage) => {
      console.log(newPage.payload);
      console.log(state.isPage);
      state.isOffset = newPage.payload * 10;
      state.isPage = newPage.payload;
    }
  },
});

export const { updatePage } = pageSlice.actions;
