import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Tài khoản của tôi"
        button={
          <Link href="/profile/edit">
            <Button color="primary" bg="primary.light" px="2rem">
              Chỉnh sửa
            </Button>
          </Link>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src="" size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">Trương Thị Cam</H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Tích lũy:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        200.000 VND
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    Hạng Bạc
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Họ
          </Small>
          <span>Trương Thị</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Tên
          </Small>
          <span>Cam</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>camcam.qng@gmail.com</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Số điện thoại
          </Small>
          <span>0383060695</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Sinh nhật
          </Small>
          <span className="pre">
            03/08/2000
          </span>
        </FlexBox>
      </TableRow>
    </div>
  );
};

const infoList = [
  {
    title: "05",
    subtitle: "Đơn hàng",
  },
  {
    title: "02",
    subtitle: "Chờ xác nhận",
  },
  {
    title: "02",
    subtitle: "Đang giao",
  },
  {
    title: "01",
    subtitle: "Đã giao",
  },
];

Profile.layout = DashboardLayout;

export default Profile;
