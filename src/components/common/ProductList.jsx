import { Button } from '@mui/material';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


 
export default function ProductList({ to = '', data = []}) {
  return (
      <>
          <ul className="content-wrapper cart-list product-list">
              {data.map((item, i) => (
                  <li className="cart cart__product">
                      <NavLink to={to + `${item.id}`}>
                          <div className="cart__product-image">
                              <img src={item.img} alt={item.title} />
                          </div>
                          <h3 className="cart__product-title"> {item.title}</h3>
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
