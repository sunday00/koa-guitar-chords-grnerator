import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../components/main/Login";

const Header = ({ match }) => {
  return (
    <header>
      <Login></Login>
    </header>
  );
};

export default Header;
