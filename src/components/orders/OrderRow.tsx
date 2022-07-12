import { InvoiceDto } from "@utils/apiTypes";
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
  item: InvoiceDto;
  isAdmin?: boolean
}

const OrderRow: React.FC<OrderRowProps> = ({ item, isAdmin }) => {
  const getColor = (paymentStatus) => {
    switch (paymentStatus) {
      case "Đang chờ thanh toán":
        return "secondary";
      case "Thanh toán thành công":
        return "success";
      case "Thanh toán thất bại":
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link href={isAdmin ? `/admin/orders/${item.id}` : `/orders/${item.id}`}>
      <TableRow as="a" href={isAdmin ? `/admin/orders/${item.id}` : `/orders/${item.id}`} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.id}
        </H5>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(item.paymentStatus)}.light`}>
            <Small color={`${getColor(item.paymentStatus)}.main`}>{item.paymentStatus}</Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {format(new Date(`${item.dateOrdered}Z`), "kk:mm:ss dd-MM-yyyy")}
        </Typography>
        <Typography m="6px" textAlign="left">
          {item.totalPayment} VND
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
