import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  item: {
    orderNo: any;
    status: string;
    href: string;
    purchaseDate: string | Date;
    price: number;
  };
}

const OrderRow: React.FC<OrderRowProps> = ({ item }) => {
  const getColor = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return "secondary";
      case "Đang giao":
        return "secondary";
      case "Đã giao":
        return "success";
      case "Hủy":
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link href={item.href}>
      <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.orderNo}
        </H5>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(item.status)}.light`}>
            <Small color={`${getColor(item.status)}.main`}>{item.status}</Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {format(new Date(item.purchaseDate), " dd-MM-yyyy")}
        </Typography>
        <Typography m="6px" textAlign="left">
          {item.price} VND
        </Typography>

        <Hidden flex="0 0 0 !important" down={769}>
          <Typography textAlign="center" color="text.muted">
            <IconButton size="small">
              <Icon variant="small" defaultcolor="currentColor">
                arrow-right
              </Icon>
            </IconButton>
          </Typography>
        </Hidden>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
