import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";

import "./Navbar.scss";
import MLLogo from "../../assets/img/Logo_ML.png";
import MLSearch from "../../assets/img/ic_Search.png";

const Navbar = (props) => {
  const searchQuery =
    props.location !== undefined
      ? queryString.parse(props.location.search)
      : { q: "" };

  const [search, setSearch] = useState(searchQuery.q ?? "");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const history = useHistory();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      history.push({
        pathname: "/items",
        search: `?q=${search}`,
        state: { detail: `Buscar ${search}` },
      });
    },
    [history, search]
  );

  return (
    <nav className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 mx-auto d-flex justify-content align-items-center">
            <Link to="/" className="navbar-brand py-2" onClick={() => setSearch("")}>
              <img
                src={MLLogo}
                className="img-fluid ml-logo"
                alt="MercadoLibre"
              />
            </Link>
            <form className="w-100 py-2" onSubmit={onSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Nunca dejes de buscar"
                  aria-label="Nunca dejes de buscar"
                  onChange={onChangeSearch}
                  value={search}
                  autoFocus={true}
                />
                <div className="input-group-append">
                  <button className="btn bg-light border-0" type="submit">
                    <img
                      src={MLSearch}
                      className="img-fluid ml-logo"
                      alt="Buscar"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
