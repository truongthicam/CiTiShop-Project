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
import Spinner from "@component/Spinner";
import { H5, Paragraph } from "@component/Typography";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = () => {
  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // id is search query name
  const [pageNumber, setPageNumber] = useState(1);
  const pageLimit = 10;

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ProductDto[]>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // console.log(id);
      fetch(new URL(`/api/Product/?name=${id}&page=${pageNumber}&limit=${pageLimit}`, apiEndpoint).href)
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
    }
  }, [id, pageNumber]);

  const togglePageChange = useCallback((selected: number) => {
    // console.log(selected);
    setPageNumber(selected + 1);
  }, []);

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
          <H5>T??m ki???m ???{id}???</H5>
          <Paragraph color="text.muted">{loading ? '...' : totalItems} k???t qu??? ???????c t??m th???y</Paragraph>
        </div>
        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            L???c:
          </Paragraph>
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="S???p x???p theo"
              options={sortOptions}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            B??? c???c:
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
        {/* TODO: Add callback for pagination */}
        <Grid item lg={9} xs={12}>
          {loading ? <Spinner /> : totalItems === 0 ? <H5 style={{ textAlign: 'center' }}>Kh??ng t??m th???y s???n ph???m n??o.</H5> : view === "grid"
            ? <ProductCard1List limit={pageLimit} page={pageNumber} currentPage={currentPage}
              items={items} totalItems={totalItems} totalPages={totalPages}
              onChange={togglePageChange} />
            : <ProductCard9List limit={pageLimit} page={pageNumber} currentPage={currentPage}
              items={items} totalItems={totalItems} totalPages={totalPages}
              onChange={togglePageChange} />}
        </Grid>
      </Grid>
    </Box>
  );
};

const sortOptions = [
  { label: "M???i nh???t", value: "M???i nh???t" },
  { label: "B??n ch???y", value: "B??n ch???y" },
  { label: "Gi?? th???p", value: "Gi?? th???p" },
  { label: "Gi?? cao", value: "Gi?? cao" },
];

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;
