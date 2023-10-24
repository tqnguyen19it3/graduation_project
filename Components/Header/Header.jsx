import React, { useState, useEffect } from "react";
import Link from "next/link";
import Style from "./Header.module.css";
import { Logo, Login, SignUp, ForgotPassword } from "../index";

const Header = ({ notification, setNotification }) => {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "API",
      link: "/nfts-api",
    },
  ];

  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [token, setToken] = useState("");

  const openModel = (el) => {
    if(el == "Login") {
      setLogin(true);
      setSignUp(false);
    } else if (el == "SignUp"){
      setSignUp(true);
      setLogin(false);
    } else if (el == "ForgotPassword"){
      setForgotPassword(true);
      setLogin(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("NFTApi_Token");
    setToken(token);
  }, []);

  const logout = () => {
    localStorage.removeItem("NFTApi_Token");
    window.location.reload();
  };

  return (
    <>
      <div className={Style.Header}>
        <a href="/"><Logo /></a>
        <div className={Style.menu}>
          {menuList.map((el, i) => (
            <Link className={Style.link} href={el.link} key={i + 1}>
              <p>{el.name}</p>
            </Link>
          ))}
          {token ? (
            <p onClick={() => logout()}>Logout</p>
          ) : (
            <>
              <p onClick={() => openModel("Login")}>Login</p>
              <p onClick={() => openModel("SignUp")}>SignUp</p>
            </>
          )}
        </div>
      </div>
      {/* //SignUp */}
      {signUp && (
        <div className={Style.form}>
          <div className={Style.form_inner}>
            <SignUp
              setLogin={setLogin}
              setSignUp={setSignUp}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
      {/* Login */}
      {login && (
        <div className={Style.form}>
          <div className={Style.form_inner}>
            <Login
              setLogin={setLogin}
              setForgotPassword={setForgotPassword}
              setSignUp={setSignUp}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
      {/* ForgotPassword */}
      {forgotPassword && (
        <div className={Style.form}>
          <div className={Style.form_inner}>
            <ForgotPassword
              setForgotPassword={setForgotPassword}
              setLogin={setLogin}
              setSignUp={setSignUp}
              notification={notification}
              setNotification={setNotification}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
