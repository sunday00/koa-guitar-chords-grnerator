import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import ChordsRead from "./components/chords/ChordsRead";
import store from "./modules/index";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route
            render={() => <ChordsRead />}
            path={["/chord/read/:provider/:id"]}
            exact
          />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
