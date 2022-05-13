import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// React router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import CardDetail from "./components/CardDetail/CardDetail";
import NotFound from "./components/NotFound/NotFound";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/cardDetail/:id" element={<CardDetail />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
