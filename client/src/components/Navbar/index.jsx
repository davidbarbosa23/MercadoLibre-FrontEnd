import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Navbar.scss";
import MLLogo from "../../assets/img/Logo_ML.png";
import MLSearch from "../../assets/img/ic_Search.png";

const Navbar = (props) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const history = useHistory();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    history.push({
      pathname: "/items",
      search: `?q=${search}`,
      state: { detail: `Buscar ${search}` },
    });
  }, [history, search]);

  return (
    <nav className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 mx-auto d-flex justify-content">
            <Link to="/" className="navbar-brand" onClick={() => setSearch("")}>
              <img
                src={MLLogo}
                className="img-fluid ml-logo"
                alt="MercadoLibre"
              />
            </Link>
            <form className="input-group mb-3" onSubmit={onSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Nunca dejes de buscar"
                aria-label="Nunca dejes de buscar"
                onChange={onChangeSearch}
                value={search}
              />
              <div className="input-group-append">
                <button className="btn" type="submit">
                  <img
                    src={MLSearch}
                    className="img-fluid ml-logo"
                    alt="Buscar"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
