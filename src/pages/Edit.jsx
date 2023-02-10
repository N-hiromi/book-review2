import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./edit.scss";
import { url } from "../const";
import { useForm } from 'react-hook-form';

export const Edit = () => {
  const [cookies] = useCookies();
  const [errorMessage, setErrorMessage] = useState();
  const [detail, setDetail] = useState();
  const nav = useNavigate();
  const bookId = useParams().bookId;
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    //初期値取得
    axios.get(`${url}/books/${bookId}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setDetail(res.data)
      console.log(res.data);
    })
    .catch((err) => {
      setErrorMessage(`初期値の取得に失敗しました。${err}`);
    })
  }, []);

  const editReview = (event) => {
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

  const deleteReview = () => {
    const delApi = async () => {
      console.log(cookies.token);
      axios.delete(`${url}/books/${bookId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        console.log(res);
        console.log("削除できたよ")
      })
      .catch((err) => {
        setErrorMessage(`レビューの削除に失敗しました。${err}`);
        throw new Error(err.message);
      })
    }
    //削除APIが終わってからhome画面へ遷移したいので
    const delStart = async () => {
      delApi().then(
        result => {
          nav("/");
        }
      ).catch(
        er => {
          console.log(er);
        }
      )
    }
    delStart();
  }

  return (
    <div>
      <Header />
      <main className="edit">
        <h2 id="test">書籍編集</h2>
        <p className="error-message">{errorMessage}</p>
        {/* detailの初期化がDOM作成に間に合わないのでdetailができたら表示 */}
        {detail && 
          <form className="new-form" onSubmit={ handleSubmit(editReview) }>
          <label className="label" htmlFor="title">
            {errors.title && <div className="error-title-message">入力が必須の項目です</div>}
            タイトル
            <input type="text" id="title" className="input" {...register('title', { required: true })} defaultValue={ detail.title } /><br />
          </label><br />
          <label className="label" htmlFor="url">
            {errors.url && <div className="error-url-message">入力が必須の項目です</div>}
            url
            <input type="text" id="url" className="input" {...register('url', { required: true })} defaultValue={ detail.url } /><br />
          </label><br />
          <label className="label" htmlFor="detail">
            {errors.detail && <div className="error-detail-message">入力が必須の項目です</div>}
            詳細
            <input type="text" id="detail" className="input" {...register('detail', { required: true })} defaultValue={ detail.detail } /><br />
          </label><br />
          <label className="label" htmlFor="review">
            {errors.review && <div className="error-review-message">入力が必須の項目です</div>}
            レビュー
            <input type="text" id="review" className="input" {...register('review', { required: true })} defaultValue={ detail.review } /><br />
          </label><br />
          
          <div className="button-wrapper">
            <button type="submit" className="post-button">登録</button>
          </div>
        </form>
        }
        <div className="button-wrapper">
          <button type="submit" className="delete-button" onClick={ () => deleteReview() }>削除</button>
        </div>
      </main>
    </div>
  )
}
