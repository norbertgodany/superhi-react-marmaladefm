import React from "react";

const Show = ({ match }) => (
  <div>
    <h1>Show page</h1>
    <p>{match.params.id}</p>
  </div>
);

export default Show;
