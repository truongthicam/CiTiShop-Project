import Card from "@component/Card";
import CategorySectionCreator from "@component/CategorySectionCreator";
import ProductCard4 from "@component/product-cards/ProductCard4";
import Link from "next/link";
import React from "react";
import Grid from "../grid/Grid";

const Featured: React.FC = () => {
  return (
    <CategorySectionCreator
      iconName="ranking-1"
      title="Sản phẩm nổi bật"
      seeMoreLink="#"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {topRatedList.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.title}>
              <Link href={item.productUrl}>
                <a>
                <ProductCard4 {...item} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
 
  );
};

const topRatedList = [
  {
    imgUrl: "/assets/images/products/son3CE.jpg",
    title: "Son 3CE",
    rating: 5,
    price: 299000,
    reviewCount: 49,
    productUrl: "/product/d1",
  },
  {
    imgUrl: "/assets/images/products/kcnanness.jpg",
    title: "Kem chống nắng",
    rating: 4.75,
    price: 400000,
    reviewCount: 20,
    productUrl: "/product/d12",
  },
  {
    imgUrl: "/assets/images/products/taytranglarocheposay.jpg",
    title: "Tẩy trang Laroche Posay",
    rating: 5,
    price: 499000,
    reviewCount: 65,
    productUrl: "/product/d14",
  },
  {
    imgUrl: "/assets/images/products/srmcetaphil.jpg",
    title: "Sữa rửa mặt Cetaphil",
    rating: 5,
    price: 12900,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
  {
    imgUrl: "/assets/images/products/sonloreal.jpg",
    title: "Son Loreal",
    rating: 5,
    price: 12900,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
  {
    imgUrl: "/assets/images/products/taytrangloreal.jpg",
    title: "Tẩy trang",
    rating: 5,
    price: 12900,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
];


export default Featured;