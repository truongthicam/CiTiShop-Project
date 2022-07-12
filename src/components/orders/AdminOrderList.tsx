import Spinner from "@component/Spinner";
import { InvoiceDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";

export interface AdminOrderListProps { }

const AdminOrderList: React.FC<AdminOrderListProps> = () => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 10;

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<InvoiceDto[]>([]);

  useEffect(() => {
    setLoading(true);
    // console.log(id);
    fetch(new URL(`api/Invoice/?ignoreUserId=true&page=${pageNumber}&limit=${pageLimit}`, apiEndpoint).href)
      .then(async response => {
        // console.log(response);
        if (response.ok) {
          let responseJson = await response.json();
          // console.log(responseJson);
          setTotalPages(responseJson.totalPages);
          setTotalItems(responseJson.totalItems);
          setCurrentPage(responseJson.currentPage);
          setItems(responseJson.items);
          setLoading(false);
        }
      }, (err) => {
        console.error(err);
      })
  }, [pageNumber]);

  const togglePageChange = useCallback((selected: number) => {
    // console.log(selected);
    setPageNumber(selected + 1);
  }, []);

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

      {loading ? <Spinner /> : totalItems === 0 ? <H5 style={{ textAlign: 'center' }}>Không tìm thấy đơn hàng nào.</H5> :
        <>
          {items.map((item) => (
            <OrderRow item={item} key={item.id} isAdmin={true} />
          ))}
          <FlexBox justifyContent="center" mt="2.5rem">
            <Pagination
              pageCount={totalPages} currentPage={currentPage} onChange={togglePageChange}
            />
          </FlexBox>
        </>
      }
    </Fragment>
  );
};

// const orderList = [
//   {
//     orderNo: "1050017AS",
//     status: "Đang giao",
//     purchaseDate: new Date(),
//     price: 350000,
//     href: "/admin/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Chờ xác nhận",
//     purchaseDate: new Date(),
//     price: 500000,
//     href: "/admin/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Đã giao",
//     purchaseDate: "2022/02/23",
//     price: 700000,
//     href: "/admin/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Đã giao",
//     purchaseDate: "2022/02/23",
//     price: 700000,
//     href: "/admin/orders/5452423",
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Đã hủy",
//     purchaseDate: "2022/05/15",
//     price: 300000,
//     href: "/admin/orders/5452423",
//   },
// ];

export default AdminOrderList;
