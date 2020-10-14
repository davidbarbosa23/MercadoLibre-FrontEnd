import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

const Item = ({ item }) => {
  return (
    <li className="w-100">
      <Link to={"/items/" + item.id} className="media w-100">
        <img
          src={item.picture}
          className="thumbnail mr-3 img-fluid"
          alt={item.title}
        />
        <div className="media-body">
          <h5 className="mt-0">
            {item.price.currency} {item.price.amount}.
            <small>{item.price.decimals}</small>
          </h5>
          <h2 className="h6">{item.title}</h2>
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
      return <Item item={item} />;
    });
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [props.location.search]);

  return (
    <div className="container jumbotron bg-white mt-3">
      <ul className="row list-unstyled">{listItems()}</ul>
    </div>
  );
};

export default SearchList;
