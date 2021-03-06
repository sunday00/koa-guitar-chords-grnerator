import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomeContainer from "./containers/main/HomeContainer";
import Header from "./containers/main/Header";
import ChordReadContainer from "./containers/chords/ChordReadContainer";
import ChordListContainer from "./containers/chords/ChordListContainer";
import ChordCreateContainer from "./containers/chords/ChordCreateContainer";
import ChordEditContainer from "./containers/chords/ChordEditContainer";
import ProviderCreateContainer from "./containers/providers/ProviderCreateContainer";
import SongCreateContainer from "./containers/songs/SongCreateContainer";
import SongListContainer from "./containers/songs/SongListContainer";
import RiffCreateContainer from "./containers/riffs/RiffCreateContainer";
import RiffEditContainer from "./containers/riffs/RiffEditContainer";
import SongReadContainer from "./containers/songs/SongReadContainer";
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
            render={(props) => <ChordEditContainer {...props} />}
            path="/chord/edit/:provider/:id"
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
          <Route
            render={(props) => <SongListContainer {...props} />}
            path="/song/list/:provider"
            exact
          />

          <Route
            render={(props) => <RiffCreateContainer {...props} />}
            path="/riff/create/:provider/:song"
            exact
          />
          <Route
            render={(props) => <RiffEditContainer {...props} />}
            path="/riff/edit/:provider/:song/:riff"
            exact
          />
          <Route
            render={(props) => <SongReadContainer {...props} />}
            path="/song/read/:provider/:song"
            exact
          />
        </BrowserRouter>

        <Footer pathname={pathname} />
      </Provider>
    </div>
  );
}

export default App;
