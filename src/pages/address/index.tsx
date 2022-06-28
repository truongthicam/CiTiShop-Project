import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import React from "react";

const AddressList = () => {
  return (
    <div>
      <DashboardPageHeader
        title="Sổ địa chỉ"
        iconName="pin_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Thêm địa chỉ
          </Button>
        }
      />

      {orderList.map(() => (
        <TableRow my="1rem" padding="6px 18px">
          <Typography className="pre" m="6px" textAlign="left">
            Cam
          </Typography>
          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            01 Võ Văn Ngân, Thủ Đức
          </Typography>
          <Typography className="pre" m="6px" textAlign="left">
            0383060695
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href="/address/xkssThds6h37sd">
              <Typography as="a" href="/address/xkssThds6h37sd" color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

const orderList = [
  {
    orderNo: "1050017AS",
    status: "Chờ xác nhận",
    purchaseDate: new Date(),
    price: 35000,
  },
  {
    orderNo: "1050017AS",
    status: "Chờ xác nhận",
    purchaseDate: new Date(),
    price: 500000,
  },
  {
    orderNo: "1050017AS",
    status: "Đã giao",
    purchaseDate: "2022/04/23",
    price: 700000,
  },
  {
    orderNo: "1050017AS",
    status: "Đã giao",
    purchaseDate: "2022/05/29",
    price: 700000,
  },
  {
    orderNo: "1050017AS",
    status: "Hủy",
    purchaseDate: "2022/06/06",
    price: 30000,
  },
];

AddressList.layout = DashboardLayout;

export default AddressList;
