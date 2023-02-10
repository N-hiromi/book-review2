import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Page } from "../components/Page";
import { url } from "../const";
import "./detail.scss";
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from "react-redux"
import  { startLoading, stopLoading } from "../slice/loadingSlice";

export const Detail = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [detail, setDetail] = useState([]);
  const [cookies] = useCookies(["token"]);
  const page = useSelector((state) => state.page.isPage);
  //urlからidを取得
  const bookId = useParams().bookId;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.isLoading)

  useEffect(() => {
    const waitTest = () => {
      //リスト取得
    axios.get(`${url}/books/${bookId}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setDetail(res.data)
      console.log(res.data);
      dispatch(stopLoading());
    })
    .catch((err) => {
      setErrorMessage(`詳細の取得に失敗しました。${err}`);
      dispatch(stopLoading());
    })
    }
    //ローディングスタート
    dispatch(startLoading());
    //ローディング確認用
    setTimeout(waitTest, 1000);
  }, []);

  return (
    <div>
      {loading? <Loading />: 
        <div className="show">
          <Header />
          <main className="home">
            <h2>タイトル：{detail.title}</h2>
            <p>レビュワー：{detail.reviewer}</p>
            <p>レビュー：{detail.review}</p>
            <p>詳細：{detail.detail}</p>
            <p></p>
          </main>
        </div>
      }
    </div>
  )
}
