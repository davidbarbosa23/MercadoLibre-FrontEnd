import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import queryString from "query-string";

import { useCategories } from "../../context/categories";
import PriceFormatter from "../../utilities/PriceFormatter";


import "./SearchList.scss";
import MLShipping from "../../assets/img/ic_shipping.png";

const Item = ({ item }) => {
  return (
    <li className="w-100 py-3">
      <Link
        to={`/items/${item.id}`}
        className="media w-100 text-body text-decoration-none"
      >
        <div className="d-flex align-items-center justify-content-center thumbnail mr-3">
          <img src={item.picture} className="img-fluid" alt={item.title} />
        </div>
        <div className="row media-body">
          <span className="h4 w-100 d-flex m-0 py-3 align-items-center">
            <PriceFormatter price={item.price} />
            <img
              src={MLShipping}
              alt="Envio Gratis"
              className={item.free_shipping ? "px-2" : "d-none"}
            />
          </span>
          <h2 className="py-3 m-0 itemTitle w-75">{item.title}</h2>
          <p className="w-25"><small>{item.location}</small></p>
        </div>
      </Link>
    </li>
  );
};

const SearchList = (props) => {
  const { setCategories } = useCategories();

  const searchQuery = queryString.parse(props.location.search);

  const [items, setItems] = useState([]);

  const listItems = () => {
    return items.map((item) => {
      return <Item key={item.id} item={item} />;
    });
  };

  useEffect(() => {
    const getItems = async () => {
      let response = await fetch(
        "http://localhost:5000/items?" +
          new URLSearchParams({
            q: searchQuery.q,
          })
      );
      response = await response.json();

      if (response["items"] !== undefined && response.items.length > 0) {
        setItems(response.items);
        setCategories(response.categories);
      } else {
        setItems([]);
        setCategories({});
      }
    };

    getItems();

    return () => {
      setCategories({});
    };
    // eslint-disable-next-line
  }, [props.location.search]);

  return (
    <div className="container searchList">
      <Helmet>
        <title>{searchQuery.q} en Mercado Libre</title>
        <meta
          name="description"
          content="La comunidad de compra y venta online más grande de América Latina."
        />
      </Helmet>
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="jumbotron bg-white mt-3 px-3 pt-3 pb-3">
            <ul className="list-unstyled m-0">{listItems()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
