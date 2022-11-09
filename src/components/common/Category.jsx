import React from 'react'
import { useParams } from 'react-router';
import { products } from '../../db/productsDb';
import ProductList from './ProductList'

export default function Category() {
    const { category } = useParams();
    const categoryName = category.replace("_", " ");
    const categoryProducts = products.filter((item) => item.category === categoryName); 


  return (
      <div className="content-wrapper pd-1-3">
          <h1 className="title">{`${categoryName} (${categoryProducts.length})`}</h1>
          <ProductList data={categoryProducts} />
      </div>
  );
}
