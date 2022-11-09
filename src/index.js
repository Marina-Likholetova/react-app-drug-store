import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/sass/style.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux'
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

import About from './components/About';
import Products from './components/Products';
import ProductItem from './components/common/ProductItem';
import Home from './components/Home';
import Category from './components/common/Category';
import ShoppingList from './components/ShoppingList';
import Login from './components/Login';
import Registration from './components/Registration';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "registration",
        element: <Registration />
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductItem />
      },
      {
        path: "categories/:category",
        element: <Category />,
      },
      {
        path: "categories/:category/:id",
        element: <ProductItem />
      },
      {
        path: "shoppinglist",
        element: <ShoppingList/>
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

