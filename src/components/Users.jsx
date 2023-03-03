import axios from "axios";
import React, { useEffect, useState } from "react";
import LineItem from "../commons/LineItem";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users/allusers")
      .then((response) => setUsers(response.data));
  });
  return (
    <>
      <h1 className="is-size-2 m-4">Users</h1>
      <div className="columns is-multiline m-4 is-2">
        {users.map((user, i) => (
          <div className="column is-one-third " key={i}>
            <LineItem user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
