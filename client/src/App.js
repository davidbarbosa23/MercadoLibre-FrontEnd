import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./components/home";
import SearchList from "./components/search-list";
import Single from "./components/single";

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
