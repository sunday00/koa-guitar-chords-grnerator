import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./components/main/Home";
import ChordReadContainer from "./containers/chords/ChordReadContainer";
import ChordListContainer from "./containers/chords/ChordListContainer";
import store from "./modules/index";
import ChordCreateContainer from "./containers/chords/ChordCreateContainer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route render={(props) => <Home {...props} />} path="/" exact />
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
      </Provider>
    </div>
  );
}

export default App;
