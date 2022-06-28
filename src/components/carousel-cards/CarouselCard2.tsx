import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard1 } from "./CarouselCardStyle";

export interface CarouselCard1Props {}

const CarouselCard2: React.FC<CarouselCard1Props> = () => {
  return (
    <StyledCarouselCard1>
      <div>
        <h1 className="title">Ngày hội thương hiệu</h1>
        <h2>Giảm đến 35%</h2>
        <Typography color="secondary.main" mb="1.35rem">
          Từ ngày 13/06 - 30/06
        </Typography>
        <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
          Xem ngay
        </Button>
      </div>

      <div className="image-holder">
        <img
          src="/assets/images/products/taytrangloreal.jpg"
          alt="sale"
        />
      </div>
    </StyledCarouselCard1>
    
  );
};

export default CarouselCard2;
