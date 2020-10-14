import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
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
        <div className="media-body">
          <span className="h4 d-flex m-0 py-3 align-items-center">
            <PriceFormatter price={item.price} />
            <img
              src={MLShipping}
              alt="Envio Gratis"
              className={item.free_shipping ? "px-2" : "d-none"}
            />
          </span>
          <h2 className="py-3 m-0 itemTitle w-75">{item.title}</h2>
        </div>
      </Link>
    </li>
  );
};

const SearchList = (props) => {
  const searchQuery = queryString.parse(props.location.search);

  const [items, setItems] = useState([]);

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
    } else {
      setItems([]);
    }
  };

  const listItems = () => {
    return items.map((item) => {
      return <Item key={item.id} item={item} />;
    });
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [props.location.search]);

  return (
    <div className="container searchList">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="jumbotron bg-white mt-3 px-3 py-0">
            <ul className="list-unstyled">{listItems()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
