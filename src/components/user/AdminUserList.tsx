import Spinner from "@component/Spinner";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import UserRow from "./UserRow";

export interface AdminUserListProps { }

const AdminUserList: React.FC<AdminUserListProps> = () => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<UserDto[]>([]);

  useEffect(() => {
    setLoading(true);
    // console.log(id);
    fetch(new URL(`api/User/?page=${pageNumber}&limit=${pageLimit}`, apiEndpoint))
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
            ID
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Tên khách hàng
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Email
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Trạng thái
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Phân quyền
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {loading ? <Spinner /> : totalItems === 0 ? <H5 style={{ textAlign: 'center' }}>Không tìm thấy tài khoản nào.</H5> :
        <>{items.map((item, ind) => (
          <UserRow item={item} key={item.id} />
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

// const userList = [
//   {
//     userNo: "1",
//     status: "Hoạt động",
//     name: "Camcam",
//     email: "Cam@gmail.com",
//     author: "KH",
//     href: "/admin/users/1",
//   },
//   {
//     userNo: "2",
//     status: "Hoạt động",
//     name: "Cam",
//     email: "Cammm@gmail.com",
//     author: "NV",
//     href: "/admin/users/2",
//   },
//   {
//     userNo: "3",
//     status: "Khóa",
//     name: "Cam Trương",
//     email: "Cammmtt@gmail.com",
//     author: "NV",
//     href: "/admin/users/3",
//   },
// ];

export default AdminUserList;
