import { Button } from '@mui/material';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";


 
export default function ProductList({ to = '', data = [] }) {
     const theme = useSelector((state) => state.theme.mode);
  return (
      <>
          <ul className="content-wrapper cart-list product-list">
              {data.map((item, i) => (
                  <li className="cart cart__product" key={item.id}>
                      <NavLink to={to + `${item.id}`}>
                          <div className="cart__product-image">
                              <img src={item.img} alt={item.title} />
                          </div>
                          <h3 className={`${theme}-theme-link`}> {item.title}</h3>
                          <p className="cart__product-price">{item.price + item.currency}</p>
                          <Button variant="contained" color="warning">
                              Buy
                          </Button>
                      </NavLink>
                  </li>
              ))}
          </ul>

          <Outlet />
      </>
  );
}
