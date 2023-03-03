import React from "react";

const LineItem = ({ user }) => {
  return (
    <div className="card box is-size-medium has-background-info-light">
      <div className="card-content">
        <div className="columns">
          <div className="column is-half">
            <label className="label">Name:</label>
          </div>
          <div className="column ">
            <p>{user.name}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <label className="label">Last Name:</label>
          </div>
          <div className="column ">
            <p>{user.lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItem;
