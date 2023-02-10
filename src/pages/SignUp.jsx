import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signIn } from "../slice/authSlice";
import { useForm } from 'react-hook-form';
import { url } from "../const";
import "./signUp.scss";
import Compressor from 'compressorjs';


export function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies('token');
  const [errorMessage, setErrorMessage] = useState();

  const onSignUp = async (event) => {
    const file = event.icon[0];
    const data = {
      name: event.name,
      email: event.email,
      password: event.password
    };
    let token = '';
    const createUser = async () => {
      //会員登録
      axios.post(`${url}/users`, data)
      .then((res) => {
        console.log(res);
        dispatch(signIn());
        setCookie("token", res.data.token);
        token = res.data.token;
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。 ${err}`);
        throw new Error(err.message);
      })
    }
    const createIcon = async () => {
      //アイコン画像があれば登録する
      if (file){
        //画像の変換
        new Compressor(file, {
          convertSize: 900000,
          success(result){
            console.log(result);
            const formData = new FormData();
            formData.append('icon', result);
            // console.log(icon.get('icon'));
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              }
            }

            axios.post(`${url}/uploads`, formData, config)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              setErrorMessage(`画像の登録に失敗しました。 ${err}`);
              throw new Error(err.message);
            })
          }
        })
      }
    }
    const startSave = async () => {
      await createUser();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await createIcon();
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    const goHome = async() => {
      startSave().then(
        result => {
          nav("/");
        }
      ).catch(
        er => {
          console.log(er);
        }
      )
    }
    goHome();
  }
  return (
    <div>
      <main className="signup">
        <h2 id="test">ユーザ新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={ handleSubmit(onSignUp) }>

        <label className="label" htmlFor="icon">
            {errors.icon && <div className="error-icon-message error-message">入力が必須の項目です</div>}
            アイコン画像
            <input type="file" className="input" {...register('icon', { accept: "image/*" })} /><br />
          </label><br />

          <label className="label" htmlFor="name">
            {errors.name && <div className="error-name-message error-message">入力が必須の項目です</div>}
            ニックネーム
            <input type="text" className="input" {...register('name', { required: true })} /><br />
          </label><br />

          <label className="label" htmlFor="email">
            {errors.email && <div className="error-email-message error-message">入力が必須の項目です</div>}
            メールアドレス
            <input type="email" className="input" {...register('email', { required: true })} /><br />
          </label><br />

          <label className="label" htmlFor="password">
            {errors.password && <div className="error-password-message error-message">入力が必須の項目です</div>}
            パスワード
            <input type="password" className="input" {...register('password', { required: true })} /><br />
          </label><br />
          
          <div className="button-wrapper">
            <button type="submit" className="signup-button">登録</button>
          </div>
        </form>
      </main>
    </div>
  )
}