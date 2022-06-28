import Box from "@component/Box";
import { useRouter } from "next/router";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav
} from "./DashboardStyle";

const AdminDashboardNavigation = () => {
  const { pathname } = useRouter();

  return (
    <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900">
      {linkList.map((item) => (
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
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    href: "/admin/dashboard",
    title: "Tổng quan",
    iconName: "board",
  },
  {
    href: "/admin/products",
    title: "Sản phẩm",
    iconName: "box",
    count: 300,
  },
  {
    href: "/admin/add-product",
    title: "Thêm sản phẩm mới",
    iconName: "upload",
  },
  {
    href: "/admin/orders",
    title: "Đơn hàng",
    iconName: "shopping-cart",
    count: 40,
  },
  {
    href: "/admin/users",
    title: "Khách hàng",
    iconName: "user",
    count: 10,
  },
  {
    href: "/admin/account-settings",
    title: "Thiết lập tài khoản",
    iconName: "gear-2",
  },
];

export default AdminDashboardNavigation;
