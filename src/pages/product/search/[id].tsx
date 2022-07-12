import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Select from "@component/Select";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import { useCallback, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = () => {
  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;

  const toggleView = useCallback(
    (v) => () => {
      setView(v);
    },
    []
  );

  return (
    <Box pt="20px">
      <FlexBox
        p="1.25rem"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="55px"
        elevation={5}
        as={Card}
      >
        <div>
          <H5>Tìm kiếm “ ... ”</H5>
          <Paragraph color="text.muted">48 kết quả được tìm thấy</Paragraph>
        </div>
        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Lọc:
          </Paragraph>
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Sắp xếp theo"
              options={sortOptions}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            Bố cục:
          </Paragraph>
          <IconButton size="small" onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
            >
              grid
            </Icon>
          </IconButton>
          <IconButton size="small" onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? <ProductCard1List /> : <ProductCard9List />}
        </Grid>
      </Grid>
    </Box>
  );
};

const sortOptions = [
  { label: "Mới nhất", value: "Mới nhất" },
  { label: "Bán chạy", value: "Bán chạy" },
  { label: "Giá thấp", value: "Giá thấp" },
  { label: "Giá cao", value: "Giá cao" },
];

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;
