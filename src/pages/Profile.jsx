import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { url } from "../const";
import "./profile.scss";
import { Header } from "../components/Header";

export function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const [cookies] = useCookies('token');
  const [errorMessage, setErrorMessage] = useState();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    //ユーザ情報の取得(初期値)
      axios.get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        setUserDetail(res.data.name)
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage(`ユーザ名の初期値取得に失敗しました。${err}`);
      })
  }, []);

  const onEditUser = async (event) => {
    const data = {
      name: event.name,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      }
    }
    const updateUser = async() => {
      console.log(data);
      //ユーザ名変更
      axios.put(`${url}/users`, data, config)
      .then((res) => {
        console.log(res);
        nav('/');
      })
      .catch((err) => {
        setErrorMessage(`ユーザ名変更に失敗しました。 ${err}`);
        throw new Error(err.message);
      })
    }
    //更新が終わったらhome画面へ戻る
    updateUser();
    
  }
  return (
    <div>
      <Header />
      <main className="edit-user">
        <h2 id="test">ユーザ情報編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="edit-form" onSubmit={ handleSubmit(onEditUser) }>

          <label className="label" htmlFor="name">
            {errors.name && <div className="error-name-message error-message">入力が必須の項目です</div>}
            ニックネーム
            <input type="text" className="input" {...register('name', { required: true })} defaultValue={ userDetail } /><br />
          </label><br />

          <div className="button-wrapper">
            <button type="submit" className="edit-button">変更</button>
          </div>
        </form>
      </main>
    </div>
  )
}