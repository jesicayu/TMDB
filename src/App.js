import React, { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./commons/Header";
import NotFound from "./components/NotFound";
import Content from "./components/Content";
import Users from "./components/Users";

const App = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("api/favorites")
      .then((response) => setFavorites(response.data))
      .catch((error) => console.error(error));
  }, [user]);

  console.log("MY FAVORITES", favorites);

  useEffect(() => {
    axios
      .get("api/users/me")
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* <Route path=":type" element={<Grid/>}> </Route> */}
        <Route
          exact
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              user={user}
              setFavorites={setFavorites}
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login setUser={setUser} />} />
        <Route exact path="allusers" element={<Users />}></Route>
        <Route
          exact
          path="/"
          element={
            <Home
              user={user}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Home
              user={user}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          }
        ></Route>
        <Route
          path="/:type"
          element={
            <Content
              user={user}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          }
        />
        <Route path=":type/:id" element={<Header />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
