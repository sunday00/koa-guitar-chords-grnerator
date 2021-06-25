import React from "react";

const Home = ({ providers }) => {
  return (
    <ul>
      {providers &&
        providers.length > 0 &&
        providers.map((p, i) => {
          return (
            <li key={i}>
              <a href={`/chord/list/${p.id}`}>{p.name}</a>
            </li>
          );
        })}
    </ul>
  );
};

export default Home;
