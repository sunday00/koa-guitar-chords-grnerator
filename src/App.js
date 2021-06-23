import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import { Provider } from "react-redux";

import ChordsRead from "./components/chords/ChordsRead";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          render={() => <ChordsRead />}
          path={["/chord/read/:provider/:id"]}
          exact
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
