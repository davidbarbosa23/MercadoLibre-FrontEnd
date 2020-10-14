import React from "react";

export default function PriceFormatter ({ price }) {
  const formatter = Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <span>
      {formatter.format(price.amount)}
      <sup>{("0" + price.decimals).slice(-2)}</sup>
    </span>
  );
};
