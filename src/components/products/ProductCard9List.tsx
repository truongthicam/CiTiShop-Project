import { ProductDto } from "@utils/apiTypes";
import React from "react";
import FlexBox from "../FlexBox";
import Pagination from "../pagination/Pagination";
import ProductCard9 from "../product-cards/ProductCard9";
import { SemiSpan } from "../Typography";

export interface ProductCard9ListProps {
  limit: number;
  page: number;
  items: ProductDto[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onChange?: (selected: number) => void;
}

const ProductCard9List: React.FC<ProductCard9ListProps> = ({
  limit, page, items, currentPage, totalItems, totalPages, onChange
}) => {
  let skipItems: number = Math.min((page - 1) * limit, totalItems);
  let takeItems: number = Math.min(page * limit, totalItems);

  return (
    <div>
      {items.map((item, ind) => (
        <ProductCard9 mb="1.25rem" key={ind}
          id={item.id} imgUrl={item.imageUrl} title={item.name}
          price={item.discountPrice ?? item.price}
          originalPrice={item.discountPrice ? item.price : null} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        {/* database citishop */}
        <SemiSpan>Hiển thị {skipItems + '-' + takeItems} trong {totalItems} sản phẩm</SemiSpan>
        <Pagination pageCount={totalPages} currentPage={currentPage} onChange={onChange} />
      </FlexBox>
    </div>
  );
};

export default ProductCard9List;
