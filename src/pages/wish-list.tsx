import productDatabase from "@data/product-database";
import React from "react";
import Button from "../components/buttons/Button";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import DashboardLayout from "../components/layout/CustomerDashboardLayout";
import DashboardPageHeader from "../components/layout/DashboardPageHeader";
import Pagination from "../components/pagination/Pagination";
import ProductCard1 from "../components/product-cards/ProductCard1";

const WishList = () => {
  return (
    <div>
      <DashboardPageHeader
        title="Sản phẩm yêu thích"
        iconName="heart_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Thêm tất cả vào giỏ hàng
          </Button>
        }
      />
{/* Database Citishop */}
      <Grid container spacing={6}>
        {productDatabase.slice(0, 3).map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 {...item} originalPrice={null} />
          </Grid>
        ))}
      </Grid>

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(selected) => {
            console.log(selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

WishList.layout = DashboardLayout;

export default WishList;
