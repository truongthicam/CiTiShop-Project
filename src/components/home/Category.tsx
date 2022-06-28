import productDatabase from "@data/product-database";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";

const StyledImage = styled(NextImage)`
  border-radius: 8px;
`;

const Category: React.FC = () => {
  return (
    <Container mb="70px">
      <CategorySectionHeader
        title="Danh mục sản phẩm"
        iconName="categories"
        seeMoreLink="#"
      />

      <Grid container spacing={6}>
        {categoryList.map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href="/">
              <a>
                <Card
                  display="flex"
                  alignItems="center"
                  p="0.75rem"
                  boxShadow="small"
                  borderRadius={8}
                  hoverEffect
                >
                  <StyledImage
                    src={productDatabase[ind * 2 + 100].imgUrl}
                    alt="fashion"
                    height="52px"
                    width="52px"
                    objectFit="contain"
                  />
                  <Typography fontWeight="600" fontSize="14px" ml="10px">
                    {item}
                  </Typography>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const categoryList = [
  //Database citishop
  "Son",
  "Tẩy trang",
  "Kem chống nắng",
  "Sữa dưỡng thể",
  "Sữa rửa mặt",
  "Toner",
  "Kem dưỡng",
  "Nước hoa",
  "Phấn mắt",
  "Dưỡng thể",
  "Tinh chất/Serum",
  "Dưỡng tóc",
];

export default Category;
