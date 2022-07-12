import Box from "@component/Box";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

const DealsHot: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName="light"
      title="Deals Hot"
      seeMoreLink="product/hotdeals/listproduct" 
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {productList.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              {/* <Link href={item.productUrl}>
                  <a>
                  <ProductCard1 {...item} />
                  </a>
                </Link> */}
                <ProductCard1 {...item} />
            </Box>
            
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

const productList = [
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
    price: 129000,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
  {
    imgUrl: "/assets/images/products/sonloreal.jpg",
    title: "Son Loreal",
    rating: 5,
    price: 129000,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
  {
    imgUrl: "/assets/images/products/taytrangloreal.jpg",
    title: "Tẩy trang",
    rating: 5,
    price: 129000,
    reviewCount: 75,
    productUrl: "/product/d16",
  },
  
];

export default DealsHot;
