import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import UserRow from "./UserRow";

export interface AdminUserListProps {}

const AdminUserList: React.FC<AdminUserListProps> = () => {
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

      {userList.map((item, ind) => (
        <UserRow item={item} key={ind} />
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

const userList = [
  {
    userNo: "1",
    status: "Hoạt động",
    name: "Camcam",
    email: "Cam@gmail.com",
    author: "KH",
    href: "/admin/users/1",
  },
  {
    userNo: "2",
    status: "Hoạt động",
    name: "Cam",
    email: "Cammm@gmail.com",
    author: "NV",
    href: "/admin/users/2",
  },
  {
    userNo: "3",
    status: "Khóa",
    name: "Cam Trương",
    email: "Cammmtt@gmail.com",
    author: "NV",
    href: "/admin/users/3",
  },
  
];

export default AdminUserList;
