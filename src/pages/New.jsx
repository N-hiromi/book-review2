import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import "./new.scss";
import { url } from "../const";
import { useForm } from 'react-hook-form';

export const New = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState();
  const nav = useNavigate();
  
  const postReview = (event) => {
    console.log(event);
    const data = {
      title: event.title,
      url: event.url,
      detail: event.detail,
      review: event.review
    };
    axios.post(`${url}/books`, data, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      console.log(res);
      nav("/");
    })
    .catch((err) => {
      setErrorMessage(`レビューの登録に失敗しました。${err}`);
    })
  }

  return (
    <div>
      <Header />
      <main className="new">
        <h2 id="test">書籍新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-form" onSubmit={ handleSubmit(postReview) }>
          <label className="label" htmlFor="title">
            {errors.title && <div className="error-title-message error-message">入力が必須の項目です</div>}
            タイトル
            <input type="text" id="title" className="input" {...register('title', { required: true })} /><br />
          </label><br />
          <label className="label" htmlFor="url">
            {errors.url && <div className="error-url-message error-message">入力が必須の項目です</div>}
            url
            <input type="text" id="url" className="input" {...register('url', { required: true })} /><br />
          </label><br />
          <label className="label" htmlFor="detail">
            {errors.detail && <div className="error-detail-message error-message">入力が必須の項目です</div>}
            詳細
            <input type="text" id="detail" className="input" {...register('detail', { required: true })} /><br />
          </label><br />
          <label className="label" htmlFor="review">
            {errors.review && <div className="error-review-message error-message">入力が必須の項目です</div>}
            レビュー
            <input type="text" id="review" className="input" {...register('review', { required: true })} /><br />
          </label><br />
          
          <div className="button-wrapper">
            <button type="submit" className="post-button">登録</button>
          </div>
        </form>
      </main>
    </div>
  )
}
