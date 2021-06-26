import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Login from "../../components/main/Login";
import {logout} from "../../lib/main";
import {checkAuth} from "../../modules/auth";

const Header = ({ match }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    logout().then((res) => {
      if( res.data.result === "success" ){
        localStorage.removeItem("auth");
        localStorage.removeItem("expire");
        dispatch( checkAuth() );

        window.location.href = "/";
      }
    })
  }
    
  //TODO:: log out
  return <header>{!auth ? <Login></Login> : <a href="/logout" onClick={handleLogout}>logout</a>}</header>;
};

export default Header;
