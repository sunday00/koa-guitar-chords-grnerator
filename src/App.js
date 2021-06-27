import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomeContainer from "./containers/main/HomeContainer";
import Header from "./containers/main/Header";
import ChordReadContainer from "./containers/chords/ChordReadContainer";
import ChordListContainer from "./containers/chords/ChordListContainer";
import ChordCreateContainer from "./containers/chords/ChordCreateContainer";
import ProviderCreateContainer from "./containers/providers/ProviderCreateContainer";
import SongCreateContainer from "./containers/songs/SongCreateContainer";
import Footer from "./components/main/Footer";

import store from "./modules/index";

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

          <Route
            render={(props) => <ProviderCreateContainer {...props} />}
            path="/provider/create"
            exact
          />

          <Route
            render={(props) => <SongCreateContainer {...props} />}
            path="/song/create/:provider"
            exact
          />
        </BrowserRouter>

        <Footer pathname={pathname} />
      </Provider>
    </div>
  );
}

export default App;
