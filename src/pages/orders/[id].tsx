import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import productDatabase from "@data/product-database";
import useWindowSize from "@hook/useWindowSize";
import { format } from "date-fns";
import React, { Fragment } from "react";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = () => {
  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 350;

  return (
    <div>
      <DashboardPageHeader
        title="Chi tiết đơn hàng"
        iconName="bag_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Mua lại
          </Button>
        }
      />

      <Card p="2rem 1.5rem" mb="30px">
        <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my="2rem"
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
          >
            Ngày dự kiến giao hàng <b>12/07/2022</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Mã đơn hàng:
            </Typography>
            <Typography fontSize="14px">9001997718074513</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Ngày đặt:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(), "dd MM, yyyy")}
            </Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Ngày gửi:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(), "dd MM, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
          {productDatabase.slice(1, 3).map((item) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.imgUrl} size={64} />
                <Box ml="20px">
                  <H6 my="0px">{item.title}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    {item.price} VND x 1
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Loại sản phẩm: 400 ml
                </Typography>
              </FlexBox>
              <FlexBox flex="160px" m="6px" alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Đánh giá</Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Địa chỉ nhận hàng
            </H5>
            <Paragraph fontSize="14px" my="0px">
            01 Võ Văn Ngân, Thủ Đức
            </Paragraph>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Tính tiền
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Tổng tiền hàng:
              </Typography>
              <H6 my="0px">335.000 VND</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Phí vận chuyển:
              </Typography>
              <H6 my="0px">15.000 VND</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Giảm giá:
              </Typography>
              <H6 my="0px">- 15.000 VND</H6>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Thành tiền</H6>
              <H6 my="0px">335.000 VND</H6>
            </FlexBox>
            <Typography fontSize="14px">Thanh toán khi nhận hàng</Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;
