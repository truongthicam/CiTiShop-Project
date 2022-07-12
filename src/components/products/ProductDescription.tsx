import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";

export interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({description}) => {
  return (
    <Box>
      <H3 mb="1rem">Mô tả sản phẩm:</H3>
      <Typography>
        {description}
      </Typography>
    </Box>
  );
};

export default ProductDescription;
