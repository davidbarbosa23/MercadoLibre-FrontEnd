import React from "react";

import "./Breadcrumbs.scss";

const Breadcrumbs = (props) => {
  return (
    <div className="container breadcrumbs">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          {props.categories.length ? (
            <ul className="list-group list-group-flush list-group-horizontal">
              {props.categories.map((category, index) => (
                <li key={index} className="list-group-item bg-transparent p-0 pt-3">{category}</li>
              ))}
            </ul>
          ) : "" }
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
