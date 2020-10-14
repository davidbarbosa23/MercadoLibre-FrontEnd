import React, { useEffect, useState } from "react";

const Description = ({ text }) => {
  return (
    <div className="w-100">
      {text !== undefined
        ? text.split("\n").map((value, key) => {
            return <p key={key}>{value}</p>;
          })
        : ""}
    </div>
  );
};

const Single = (props) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      let responseItem = await fetch(
        `${process.env.REACT_APP_API_ROUTE}/items/${props.match.params.id}`
      );
      responseItem = await responseItem.json();

      if (responseItem.item !== undefined) {
        setItem(responseItem.item);
      }
    };

    getItem();
  }, [props.match.params.id]);

  return (
    <div className="container jumbotron bg-white mt-3">
      <div className="row">
        <div className="col">
          <img src={item.picture} alt={item.title} className="img-fluid" />
        </div>
        <div className="col">
          <h1>{item.title}</h1>
        </div>
      </div>
      <div className="row">
        <h4 className="w-100">Descripción del producto</h4>
        <Description text={item.description} />
      </div>
    </div>
  );
};

export default Single;
