import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProvider } from "../../modules/providers";
import Home from "../../components/main/Home";

import { checkAuth } from "../../lib/util";

const HomeContainer = ({ match }) => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers);

  useEffect(() => {
    if( checkAuth() ){
      dispatch(listProvider());
    }
  }, [dispatch, match]);

  return <Home providers={providers} />;
};

export default HomeContainer;
