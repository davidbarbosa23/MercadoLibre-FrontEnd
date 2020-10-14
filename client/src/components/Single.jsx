import React, { useEffect, useState } from "react";
import PriceFormatter from "../utilities/PriceFormatter";

const Description = ({ text }) => {
  return (
    <div className="w-100 pt-3">
      {text !== undefined
        ? text.split("\n").map((value, key) => {
            return (
              <p className="text-wrap text-break" key={key}>
                {value}
              </p>
            );
          })
        : ""}
    </div>
  );
};

const Single = (props) => {
  const [item, setItem] = useState({
    id: "",
    title: "",
    price: {
      currency: "",
      amount: 0,
      decimals: 0,
    },
    picture: "",
    condition: "",
    free_shipping: false,
    sold_quantity: 0,
    description: "",
  });

  const getCondition = (condition = "new") => {
    const availableCond = {
      new: "nuevo",
      used: "usado"
    };
    return availableCond[condition];
  };

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
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          <div className="jumbotron bg-white mt-3 p-3">
            <div className="row m-0 pt-3">
              <div className="col-12 col-md-8 text-center pb-3">
                <img
                  src={item.picture}
                  alt={item.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-12 col-md-4 pb-3">
                <small className="text-capitalize">
                  {getCondition(item.condition)} - {item.sold_quantity} vendidos
                </small>
                <h1 className="h4 font-weight-bold py-3 m-0">{item.title}</h1>
                <span className="d-block h1 py-3 m-0">
                  <PriceFormatter price={item.price} />
                </span>
                <button className="btn btn-secondary btn-lg btn-block my-3">
                  Comprar
                </button>
              </div>

              <div className="col-12">
                <h4 className="h3 w-100 py-3 m-0">Descripción del producto</h4>
                <Description text={item.description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
