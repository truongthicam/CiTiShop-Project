import Card from "@component/Card";
import CategorySectionCreator from "@component/CategorySectionCreator";
import ProductCard4 from "@component/product-cards/ProductCard4";
import Spinner from "@component/Spinner";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Grid from "../grid/Grid";

const Featured: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<ProductDto[]>([]);

  useEffect(() => {
    setLoading(true);
    // console.log(id);
    fetch(new URL(`/api/Product/Random/?count=${6}`, apiEndpoint))
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
      iconName="ranking-1"
      title="Sản phẩm nổi bật"
      seeMoreLink="#"
    >
      {loading ? <Spinner /> : totalItems === 0 ? <></> : <Card p="1rem">
        <Grid container spacing={6}>
          {items.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <Link href={`/product/${item.id}`}>
                <a>
                  <ProductCard4 imgUrl={item.imageUrl} title={item.name}
                    price={item.discountPrice ?? item.price}
                    rating={4.75} reviewCount={49} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Card>}
    </CategorySectionCreator>

  );
};

// const topRatedList = productDatabase.slice(0, 6).map(({ id, imgUrl, title, price }, idx) => {
//   return {
//     id,
//     imgUrl,
//     title,
//     rating: 4.75,
//     price,
//     reviewCount: 49,
//     productUrl: `/product/${id}`,
//   }
// })
// [
//   {
//     imgUrl: "/assets/images/products/son3CE.jpg",
//     title: "Son 3CE",
//     rating: 5,
//     price: 299000,
//     reviewCount: 49,
//     productUrl: "/product/d1",
//   },
//   {
//     imgUrl: "/assets/images/products/kcnanness.jpg",
//     title: "Kem chống nắng",
//     rating: 4.75,
//     price: 400000,
//     reviewCount: 20,
//     productUrl: "/product/d12",
//   },
//   {
//     imgUrl: "/assets/images/products/taytranglarocheposay.jpg",
//     title: "Tẩy trang Laroche Posay",
//     rating: 5,
//     price: 499000,
//     reviewCount: 65,
//     productUrl: "/product/d14",
//   },
//   {
//     imgUrl: "/assets/images/products/srmcetaphil.jpg",
//     title: "Sữa rửa mặt Cetaphil",
//     rating: 5,
//     price: 12900,
//     reviewCount: 75,
//     productUrl: "/product/d16",
//   },
//   {
//     imgUrl: "/assets/images/products/sonloreal.jpg",
//     title: "Son Loreal",
//     rating: 5,
//     price: 12900,
//     reviewCount: 75,
//     productUrl: "/product/d16",
//   },
//   {
//     imgUrl: "/assets/images/products/taytrangloreal.jpg",
//     title: "Tẩy trang",
//     rating: 5,
//     price: 12900,
//     reviewCount: 75,
//     productUrl: "/product/d16",
//   },
// ];


export default Featured;
