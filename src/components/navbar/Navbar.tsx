import Badge from "@component/badge/Badge";
import Box from "@component/Box";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import navbarNavigations from "@data/navbarNavigations";
import React from "react";
import Button from "../buttons/Button";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import Typography, { Span } from "../Typography";
import StyledNavbar from "./NavbarStyle";

export interface NavbarProps {
  navListOpen?: boolean;
}

interface Nav {
  title: string;
  url: string;
  badge: string;
  child: Nav[];
  extLink?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ navListOpen }) => {
  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        else if (nav.url)
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
              <Box className="root-child">
                <Card
                  mt="1.25rem"
                  py="0.5rem"
                  boxShadow="large"
                  minWidth="230px"
                >
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box
              className="parent"
              position="relative"
              minWidth="230px"
              key={nav.title}
            >
              <MenuItem
                style={{ display: "flex", justifyContent: "space-between" }}
                color="gray.700"
              >
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <StyledNavbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <Categories open={navListOpen}>
          <Button width="278px" height="40px" bg="body.default" variant="text">
            <Icon>categories</Icon>
            <Typography
              fontWeight="600"
              textAlign="left"
              flex="1 1 0"
              ml="10px"
              color="text.muted"
            >
              Danh mục
            </Typography>
            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories>

        <FlexBox>{renderNestedNav(navbarNavigations, true)}</FlexBox>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
