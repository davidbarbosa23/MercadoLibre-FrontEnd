import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchList from "./components/SearchList";
import Single from "./components/Single";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/items" component={SearchList} />
        <Route path="/items/:id" component={Single} />
      </div>
    </Router>
  );
}

export default App;
