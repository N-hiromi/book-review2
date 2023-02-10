import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
  isPage: 1,
  isOffset: 0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //ログイン処理
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
    //書籍一覧画面のページネーション処理
    updatePage: (state, newPage) => {
      const pageDiff = newPage - state.isPage;
      state.isOffset = pageDiff * 10;
      state.isPage = newPage;
    }
  },
});

export const { signIn, signOut, updatePage } = authSlice.actions;
