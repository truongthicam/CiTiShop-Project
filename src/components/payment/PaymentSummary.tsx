import React from "react";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography from "../Typography";

const CheckoutSummary: React.FC = () => {
  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tổng đơn:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            230.000 VND
          </Typography>
         
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Phí vận chuyển:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            40.000 VND
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Miễn phí vận chuyển:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            40.000 VND
          </Typography>
          
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Giảm:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            10.000 VND
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
      >
        220.000 VND
      </Typography>
    </Card1>
  );
};

export default CheckoutSummary;
