import Card from "@component/Card";
import Spinner from "@component/Spinner";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import Grid from "../grid/Grid";
import ProductCard2 from "../product-cards/ProductCard2";

const NewArrival: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<ProductDto[]>([]);

  useEffect(() => {
    setLoading(true);
    // console.log(id);
    fetch(new URL(`/api/Product/Random/?count=${6}`, apiEndpoint).href)
      .then(async response => {
        // console.log(response);
        if (response.ok) {
          let responseJson = await response.json();
          // console.log(responseJson);
          setTotalItems(responseJson.totalItems);
          setItems(responseJson.items);
          setLoading(false);
        }
      }, (err) => {
        console.error(err);
      })
  }, []);

  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title="Sản phẩm mới"
      seeMoreLink="#"
    >
      {loading ? <Spinner /> : totalItems === 0 ? <></> : <Card p="1rem">
        <Grid container spacing={6}>
          {items.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <ProductCard2 productUrl={`/product/${item.id}`} imgUrl={item.imageUrl}
                title={item.name} price={item.discountPrice ?? item.price} />
            </Grid>
          ))}
        </Grid>
      </Card>}
    </CategorySectionCreator>
  );
};

// const productList = productDatabase.slice(1, 7).map(({ id, imgUrl, title, price }, idx) => {
//   return {
//     id,
//     imgUrl,
//     title,
//     rating: 4.75,
//     price,
//     reviewCount: idx,
//     productUrl: `/product/${id}`,
//   }
// })
// [
//   {
//     imgUrl: "/assets/images/products/sonloreal.jpg",
//     title: "Son Loreal",
//     price: 12900,
//     productUrl: "/product/d16",
//   },
//   {
//     imgUrl: "/assets/images/products/taytrangloreal.jpg",
//     title: "Tẩy trang",
//     price: 12900,
//     productUrl: "/product/d16",
//   },

//   {
//     imgUrl: "/assets/images/products/son3CE.jpg",
//     title: "Son 3CE",
//     price: 299000,
//     productUrl: "/product/d1",
//   },
//   {
//     imgUrl: "/assets/images/products/kcnanness.jpg",
//     title: "Kem chống nắng",
//     price: 400000,
//     productUrl: "/product/d12",
//   },
//   {
//     imgUrl: "/assets/images/products/taytranglarocheposay.jpg",
//     title: "Tẩy trang Laroche Posay",
//     price: 499000,
//     productUrl: "/product/d14",
//   },
//   {
//     imgUrl: "/assets/images/products/srmcetaphil.jpg",
//     title: "Sữa rửa mặt Cetaphil",
//     price: 12900,
//     productUrl: "/product/d16",
//   },
// ];

export default NewArrival;
