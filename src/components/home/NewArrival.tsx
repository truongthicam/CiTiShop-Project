import Card from "@component/Card";
import React from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import Grid from "../grid/Grid";
import ProductCard2 from "../product-cards/ProductCard2";

const NewArrival: React.FC = () => {
  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title="Sản phẩm mới"
      seeMoreLink="#"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {productList.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.title}>
              <ProductCard2 {...item} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );
};

const productList = [
  {
    imgUrl: "/assets/images/products/sonloreal.jpg",
    title: "Son Loreal",
    price: 12900,
    productUrl: "/product/d16",
  },
  {
    imgUrl: "/assets/images/products/taytrangloreal.jpg",
    title: "Tẩy trang",
    price: 12900,
    productUrl: "/product/d16",
  },
  
  {
    imgUrl: "/assets/images/products/son3CE.jpg",
    title: "Son 3CE",
    price: 299000,
    productUrl: "/product/d1",
  },
  {
    imgUrl: "/assets/images/products/kcnanness.jpg",
    title: "Kem chống nắng",
    price: 400000,
    productUrl: "/product/d12",
  },
  {
    imgUrl: "/assets/images/products/taytranglarocheposay.jpg",
    title: "Tẩy trang Laroche Posay",
    price: 499000,
    productUrl: "/product/d14",
  },
  {
    imgUrl: "/assets/images/products/srmcetaphil.jpg",
    title: "Sữa rửa mặt Cetaphil",
    price: 12900,
    productUrl: "/product/d16",
  },
  
];

export default NewArrival;
