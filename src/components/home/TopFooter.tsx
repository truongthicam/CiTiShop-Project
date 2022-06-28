import React from "react";
import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H4 } from "../Typography";

const TopFooter: React.FC = () => {
  return (
    <Container mb="70px">
      <Grid container spacing={6}>
        {serviceList.map((item, ind) => (
          <Grid item lg={3} md={6} xs={12} key={ind}>
            <FlexBox
              as={Card}
              flexDirection="column"
              alignItems="center"
              p="3rem"
              height="100%"
              borderRadius={8}
              boxShadow="border"
              hoverEffect
            >
              <FlexBox
                justifyContent="center"
                alignItems="center"
                borderRadius="300px"
                bg="gray.200"
                size="64px"
              >
                <Icon color="secondary" size="1.75rem">
                  {item.iconName}
                </Icon>
              </FlexBox>
              <H4 mt="20px" mb="10px" textAlign="center">
                {item.title}
              </H4>
              
            </FlexBox>
          </Grid>
        ))}
      </Grid>
      {/* </Card> */}
    </Container>
  );
};

const serviceList = [
  {
    iconName: "truck",
    title: "Giao hàng tận nhà",
  },
  {
    iconName: "credit",
    title: "Thanh toán tiện lợi",
  },
  {
    iconName: "shield",
    title: "Đảm bảo chính hãng",
  },
  {
    iconName: "customer-service",
    title: "Hỗ trợ 24/7",
  },
];

export default TopFooter;
