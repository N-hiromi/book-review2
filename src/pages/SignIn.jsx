import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./signin.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../slice/authSlice";
import { url } from "../const";
import { useForm } from 'react-hook-form';

export const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useSelector((state) => state.auth.isSignIn)
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const onSignIn = (event) => {
    console.log(event);
    const data = {
      email: event.email,
      password: event.password
    };
    axios.post(`${url}/signin`, data)
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        nav("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      })
  }

  if(auth){
    return <Navigate to="/" />
  } 

  return (
    <div>
      <main className="signin">
        <h2 id="test">サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={ handleSubmit(onSignIn) }>
          <label className="email-label" htmlFor="email">
          {errors.email && <div className="error-email-message error-message">入力が必須の項目です</div>}
            メールアドレス
            <input type="email" id="email" className="email-input" data-testid='mail' {...register('email', { required: true })} /><br />
          </label><br />
          <label className="password-label" htmlFor="password">
            {errors.password && <div className="error-password-message error-message">入力が必須の項目です</div>}
            パスワード
            <input type="password" id="password" className="password-input" {...register('password', { required: true })} /><br />
          </label><br />
          <div className="button-wrapper">
            <button type="submit" className="signin-button">サインイン</button>
          </div>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  )
}