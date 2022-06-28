import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";

export interface ProductDescriptionProps {}

const ProductDescription: React.FC<ProductDescriptionProps> = () => {
  return (
    <Box>
      <H3 mb="1rem">Mô tả sản phẩm:</H3>
      <Typography>
        Mô tả...........
      </Typography>
    </Box>
  );
};

export default ProductDescription;
