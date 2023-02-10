import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
// import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { New } from "../pages/New";
import { Detail } from "../pages/Detail";
import { Edit } from "../pages/Edit";
import { Profile } from "../pages/Profile";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:bookId" element={<Detail />} />
        {auth ? (
          <>
            <Route exact path="/login" element={<Navigate to="/" />} />
            <Route exact path="/signup" element={<Navigate to="/" />} />
            <Route exact path="/new" element={<New />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/edit/:bookId" element={<Edit />} />
          </>
        ) : (
          <>
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/new" element={<Navigate to="/login" />} />
            <Route path="/edit/:bookId" element={<Navigate to="/login" />} />
          </>
        )}
        {/* <Route element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
