import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignIn } from './SignIn';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/authSlice";

describe('ログイン画面の部品存在チェック', () => {

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    }
  })

  const { container } = render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );

  test('inputはあるか', () => {
    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");
    const button = screen.getByRole('button');
    expect(emailInput).toBeVisible;
    expect(passwordInput).toBeVisible;
    expect(button).toBeVisible;
  })
})