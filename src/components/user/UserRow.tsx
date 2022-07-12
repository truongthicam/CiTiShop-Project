import { UserDto } from "@utils/apiTypes";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { Small } from "../Typography";

export interface UserRowProps {
  item: UserDto;
}

const UserRow: React.FC<UserRowProps> = ({ item }) => {
  const getColor = (emailConfirmed: boolean) => {
    switch (emailConfirmed) {
      case true:
        return "success";
      case false:
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link href={`/admin/users/${item.email}`}>
      <TableRow as="a" href={`/admin/users/${item.email}`} my="1rem" padding="6px 18px">
        <Typography m="6px" textAlign="left">
          {item.id}
        </Typography>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {item.fullName}
        </Typography>
        <Typography m="6px" textAlign="left">
          {item.email}
        </Typography>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(item.emailConfirmed)}.light`}>
            <Small color={`${getColor(item.emailConfirmed)}.main`}>{item.emailConfirmed ? "Hoạt động" : "Khoá"}</Small>
          </Chip>
        </Box>
        <Typography m="6px" textAlign="left">
          {item.isAdmin ? "NV" : "KH"}
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
