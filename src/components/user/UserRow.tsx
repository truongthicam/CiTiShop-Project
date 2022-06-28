import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface UserRowProps {
  item: {
    userNo: any;
    href: string;
    status: string;
    name: string;
    email: string;
    author: string;
  };
}

const UserRow: React.FC<UserRowProps> = ({ item }) => {
  const getColor = (status) => {
    switch (status) {
      case "Hoạt động":
        return "success";
      case "Khóa":
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link href={item.href}>
      <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.userNo}
        </H5>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(item.status)}.light`}>
            <Small color={`${getColor(item.status)}.main`}>{item.status}</Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {item.name}
        </Typography>
        <Typography m="6px" textAlign="left">
          {item.email}
        </Typography>
        <Typography m="6px" textAlign="left">
          {item.author}
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

export default UserRow;
