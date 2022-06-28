import Box from "@component/Box";
import React from "react";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography, { Span } from "../Typography";

const CheckoutSummary2: React.FC = () => {
  return (
    <Box>
      <Typography color="secondary.900" fontWeight="700" mb="1.5rem">
        Đơn hàng
      </Typography>

      {cartList.map((item) => (
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          mb="1.5rem"
          key={item.name}
        >
          <Typography>
            <Span fontWeight="700" fontSize="14px">
              {item.quantity}
            </Span>{" "}
            x {item.name}
          </Typography>
          <Typography>{item.price} VND</Typography>
        </FlexBox>
      ))}

      <Divider bg="gray.300" mb="1.5rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Tổng đơn:</Typography>
        <Typography fontWeight="700">{(230.000) }VND</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Phí vận chuyển:</Typography>
        <Typography fontWeight="700">40.000 VND</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Miễn phí vận chuyển:</Typography>
        <Typography fontWeight="700">{(40.000)} VND</Typography>
      </FlexBox>

      <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
        <Typography color="text.hint">Giảm giá:</Typography>
        <Typography fontWeight="700">10.000 VND</Typography>
      </FlexBox>

      <Divider bg="gray.300" mb="0.5rem" />

      <FlexBox
        fontWeight="700"
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
      >
        <Typography>Tổng đơn:</Typography>
        <Typography fontWeight="700">{(230.000)} VND</Typography>
      </FlexBox>
    </Box>
  );
};

const cartList = [
  {
    name: "Sữa rửa mặt Cetaphik",
    quantity: 1,
    price: 150000,
  },
  {
    name: "Son 3CE",
    quantity: 1,
    price: 150000,
  },
  {
    name: "kem chống nắng Anness",
    quantity: 1,
    price: 415000,
  },
];

export default CheckoutSummary2;
