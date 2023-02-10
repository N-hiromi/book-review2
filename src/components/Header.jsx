import React, { useState, useEffect } from 'react'
//bootstrap
import { Container, Navbar, Button } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, Link } from "react-router-dom";
import  { signOut } from "../slice/authSlice";
import { url } from "../const";
import "./header.scss";

export const Header = (props)=> {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userName, setUserName] = useState();
  const [userIcon, setUserIcon] = useState();
  const [changePage, setChangePage] = useState();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    nav("/login");
  }

  useEffect(() => {
    //ログインしていたらユーザ名を取得
    if (auth) {
      axios.get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`
        }
      })
      .then((res) => {
        setUserName(res.data.name);
        console.log(res.data);
        setUserIcon(res.data.iconUrl);
        //home画面のリストでユーザー名が必要なため
        props.setUserName(res.data.name);
        setChangePage("success");
        console.log(res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      })
    }
    console.log(userIcon);
  }, [changePage]);

	return (
		<Navbar bg="success" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Book Review App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {auth ? <Navbar.Text className="me-5">
            <Link to='/profile'>
            <img className="icon" src={userIcon}/>{ userName }
            </Link></Navbar.Text> :<></>}
          <Navbar.Text>
          {auth ? <Button variant="primary" onClick={handleSignOut}>サインアウト</Button> : <Button variant="primary" href="/login">ログイン</Button>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	)
}
	
