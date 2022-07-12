import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard6 from "../product-cards/ProductCard6";

const TopSearch: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 650) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName="categories"
      title="Tìm kiếm nhiều nhất"
      seeMoreLink="/sale-page"
    >
      <Carousel totalSlides={5} visibleSlides={visibleSlides}>
        {categoryList.map((item, ind) => (
          <Link href={item.categoryUrl} key={ind}>
            <a>
              <Card p="1rem">
                <ProductCard6
                  title={item.title}
                  subtitle={item.subtitle}
                  imgUrl={item.imgUrl}
                />
              </Card>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

const categoryList = [
  {
    title: "Son",
    subtitle: "985 sản phẩm",
    categoryUrl: "/sale-page",
    imgUrl: "/assets/images/products/son.jpg",
  },
  {
    title: "Mặt nạ",
    subtitle: "300 sản phẩm",
    categoryUrl: "/sale-page",
    imgUrl: "/assets/images/products/matna.jpg",
  },
  {
    title: "Serum",
    subtitle: "201 sản phẩm",
    categoryUrl: "/sale-page",
    imgUrl: "/assets/images/products/serum.jpg",
  },
  {
    title: "Kem chống nắng",
    subtitle: "356 sản phẩm",
    categoryUrl: "/sale-page",
    imgUrl: "/assets/images/products/kemchongnang.jpg",
  },
  {
    title: "Sữa rửa mặt",
    subtitle: "502 sản phẩm",
    categoryUrl: "/sale-page",
    imgUrl: "/assets/images/products/suaruamat.jpg",
  },
];

export default TopSearch;
