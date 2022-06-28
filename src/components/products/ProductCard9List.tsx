import productDatabase from "@data/product-database";
import React from "react";
import FlexBox from "../FlexBox";
import Pagination from "../pagination/Pagination";
import ProductCard9 from "../product-cards/ProductCard9";
import { SemiSpan } from "../Typography";

export interface ProductCard9ListProps {}

const ProductCard9List: React.FC<ProductCard9ListProps> = () => {
  return (
    <div>
      {productDatabase.slice(95, 104).map((item, ind) => (
        <ProductCard9 mb="1.25rem" key={ind} {...item} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        {/* database citishop */}
        <SemiSpan>Hiển thị 1-9 trong 2000 sản phẩm</SemiSpan> 
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
  );
};

export default ProductCard9List;
