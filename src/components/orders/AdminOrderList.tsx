import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";

export interface AdminOrderListProps {}

const AdminOrderList: React.FC<AdminOrderListProps> = () => {
  return (
    <Fragment>
      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
           Mã đơn hàng
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Trạng thái
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Ngày đặt
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Tổng tiền
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {orderList.map((item, ind) => (
        <OrderRow item={item} key={ind} />
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </Fragment>
  );
};

const orderList = [
  {
    orderNo: "1050017AS",
    status: "Đang giao",
    purchaseDate: new Date(),
    price: 350000,
    href: "/admin/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Chờ xác nhận",
    purchaseDate: new Date(),
    price: 500000,
    href: "/admin/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Đã giao",
    purchaseDate: "2022/02/23",
    price: 700000,
    href: "/admin/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Đã giao",
    purchaseDate: "2022/02/23",
    price: 700000,
    href: "/admin/orders/5452423",
  },
  {
    orderNo: "1050017AS",
    status: "Đã hủy",
    purchaseDate: "2022/05/15",
    price: 300000,
    href: "/admin/orders/5452423",
  },
];

export default AdminOrderList;
