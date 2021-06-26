import React from "react";
import { useSelector } from "react-redux";

const Home = ({ providers }) => {

  const auth = useSelector((state) => state.auth);

  return (
    <ul>
      {providers &&
        providers.length > 0 ?
        providers.map((p, i) => {
          return (
            <li key={i}>
              <a href={`/chord/list/${p.id}`}>{p.name}</a>
            </li>
          );
        }) : 
      <>
        {auth ? 
          <a href="/provider/create">You should make first chord set.</a>
         : 
         <p>This service is under private person. Should register or logged in first.</p>
        }
      </>
      }
    </ul>
  );
};

export default Home;
