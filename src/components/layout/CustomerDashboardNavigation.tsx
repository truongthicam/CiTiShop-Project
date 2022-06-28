import Box from "@component/Box";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    title: "MUA HÀNG",
    list: [
      {
        href: "/orders",
        title: "Đơn hàng",
        iconName: "bag",
        count: 5,
      },
      {
        href: "/wish-list",
        title: "Yêu thích",
        iconName: "heart",
        count: 19,
      },
      
    ],
  },
  {
    title: "TÀI KHOẢN",
    list: [
      {
        href: "/profile",
        title: "Thông tin",
        iconName: "user",
        count: 3,
      },
      {
        href: "/address",
        title: "Sổ địa chỉ",
        iconName: "pin",
        count: 16,
      },
      {
        href: "/payment-methods",
        title: "Phương thức thanh toán",
        iconName: "credit-card",
        count: 4,
      },
    ],
  },
];

export default CustomerDashboardNavigation;
