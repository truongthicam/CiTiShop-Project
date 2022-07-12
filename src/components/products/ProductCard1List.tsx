import { ProductDto } from "@utils/apiTypes";
import React from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";

export interface ProductCard1ListProps {
  limit: number;
  page: number;
  items: ProductDto[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onChange?: (selected: number) => void;
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({
  limit, page, items, currentPage, totalItems, totalPages, onChange
}) => {
  let skipItems: number = Math.min((page - 1) * limit, totalItems);
  let takeItems: number = Math.min(page * limit, totalItems);

  return (
    <div>
      <Grid container spacing={6}>
        {items.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ProductCard1 id={item.id} imgUrl={item.imageUrl} title={item.name}
              price={item.discountPrice ?? item.price}
              originalPrice={item.discountPrice ? item.price : null} />
          </Grid>
        ))}
      </Grid>

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

export default ProductCard1List;
