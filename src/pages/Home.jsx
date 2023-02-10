import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { url } from "../const";
import "./home.scss";
import "./titleList.scss";
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from "react-redux"

export const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [changePage, setChangePage] = useState();
  const [lists, setLists] = useState([]);
  const [pubLists, setPubLists] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [userName, setUserName] = useState();
  const page = useSelector((state) => state.page.isPage);
  const offset = useSelector((state) => state.page.isOffset);
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn)
  //ページネーション数
  const maxPage = 2;

  useEffect(() => {
    //ログインしていたら認証を使ってリスト取得
    if (auth) {
      //リスト取得
    axios.get(`${url}/books?offset=${offset}`, {
      headers: {
        authorization: `Bearer ${cookies.token}`
      }
    })
    .then((res) => {
      setLists(res.data)
    })
    .catch((err) => {
      setErrorMessage(`認証リストの取得に失敗しました。${err}`);
    })
    } else{
      //ログインしてなければpublicでリスト取得
      axios.get(`${url}/public/books?offset=${offset}`)
      .then((res) => {
        setPubLists(res.data)
      })
      .catch((err) => {
        setErrorMessage(`publicリストの取得に失敗しました。${err}`);
      })
    }
  }, [changePage]);

  const detailOrEdit = (reviewer, bookId) => {
    //選択されたbookIdをログAPIで送信
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      }
    }
    axios.post(`${url}/logs`, { selectBookId: bookId }, config)
      .then((res) => {
        console.log("logを送信しました");
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(`ログの送信に失敗しました。 ${err}`);
        console.log(err.message);
      })
    //userNameはheaderから取得
    if (reviewer == userName){
      nav('/edit/' + bookId);
    }else{
      nav('/detail/' + bookId);
    }
  }

  return (
    <div>
      <Header setUserName={ setUserName }/>
      <main className="home">
        <Link to="/new">新規作成する</Link>
        <Page maxPage={ maxPage } setChangePage={ setChangePage }/>
          <p className="error-message">{errorMessage}</p>
          {/* ログインしていたらリンク先を詳細と更新ページでそれぞれ処理を分ける */}
          {lists && <ListGroup defaultActiveKey="#link1" className="titleList">
            {lists.map((list, key) => {
              return (
                <ListGroup.Item className="titleList__element" onClick={() => detailOrEdit(list.reviewer, list.id)} key={key} action>{list.title}</ListGroup.Item>
              )
            })}
          </ListGroup>}
          {/* 未ログインならリンク無し */}
          {pubLists && <ListGroup defaultActiveKey="#link1" className="titleList">
            {pubLists.map((list, key) => {
              return (
                <ListGroup.Item className="titleList__element" key={key} action>{list.title}</ListGroup.Item>
              )
            })}
          </ListGroup>}
          
      </main>
    </div>
  )
}
