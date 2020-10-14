import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="container">
      <Helmet>
        <title>404 - Página no encontrada</title>
        <meta name="description" content="La comunidad de compra y venta online más grande de América Latina." />
      </Helmet>
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="jumbotron bg-white mt-3">
            <h1 className="display-4">404 - Página no encontrada</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
