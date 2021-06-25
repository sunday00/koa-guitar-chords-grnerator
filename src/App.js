import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";

import HomeContainer from "./containers/main/HomeContainer";
import Header from "./containers/main/Header";
import ChordReadContainer from "./containers/chords/ChordReadContainer";
import ChordListContainer from "./containers/chords/ChordListContainer";
import store from "./modules/index";
import ChordCreateContainer from "./containers/chords/ChordCreateContainer";

function App() {
  const pathname = window.location.pathname;

  return (
    <div className="App">
      <Provider store={store}>
        <Header />

        <BrowserRouter>
          <Route
            render={(props) => <HomeContainer {...props} />}
            path="/"
            exact
          />
          <Route
            render={(props) => <ChordCreateContainer {...props} />}
            path="/chord/create/:provider"
            exact
          />
          <Route
            render={(props) => <ChordReadContainer {...props} />}
            path="/chord/read/:provider/:id"
          />
          <Route
            render={(props) => <ChordListContainer {...props} />}
            path="/chord/list/:provider"
          />
        </BrowserRouter>

        <footer>
          <nav>
            <ul>
              <li>
                <a href="/">
                  <FontAwesomeIcon icon={faHome} />
                </a>
              </li>
              {(pathname.startsWith("/chord/read") ||
                pathname.startsWith("/chord/create")) && (
                <li>
                  <a href={`/chord/list/${pathname.split("/")[3]}`}>
                    <FontAwesomeIcon icon={faList} />
                  </a>
                </li>
              )}
              {pathname.startsWith("/chord/list") && (
                <li>
                  <a href={`/chord/create/${pathname.split("/")[3]}`}>
                    <FontAwesomeIcon icon={faPencilRuler} />
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </footer>
      </Provider>
    </div>
  );
}

export default App;
