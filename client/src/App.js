import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/** Components */
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import Home from "./components/Home";
import SearchList from "./components/SearchList";
import Single from "./components/Single";
import PageNotFound from "./components/PageNotFound";

/** Context */
import { CategoriesProvider, useCategories } from "./context/categories";

/** App inside CategoriesProvider to use CategoriesContext for breadcrumbs */
export default () => (
  <CategoriesProvider>
    <App></App>
  </CategoriesProvider>
);

function App() {
  const { categories } = useCategories();
  return (
    <Router>
      <div>
        <Navbar />
        <Breadcrumbs categories={categories} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/items" exact component={SearchList} />
          <Route path="/items/:id" component={Single} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}
