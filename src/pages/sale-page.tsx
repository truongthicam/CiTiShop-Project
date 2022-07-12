import Spinner from "@component/Spinner";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import SaleLayout from "../components/layout/SaleLayout";
import Pagination from "../components/pagination/Pagination";
import ProductCard1 from "../components/product-cards/ProductCard1";
import { SemiSpan } from "../components/Typography";

const SalePage = () => {
  const productPerPage = 28;
  const [productList, setProductList] = useState<ProductDto[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((selected: number) => {
    // console.log(selected);
    setPage(selected + 1);
  }, []);

  const renderProductCount = () => {
    let startNumber: number = Math.min((page - 1) * productPerPage, totalItems);
    let endNumber: number = Math.min(page * productPerPage, totalItems);

    return `Hiển thị ${startNumber + 1}-${endNumber} trong ${totalItems} sản phẩm`;
  };

  useEffect(() => {
    setLoading(true);
    fetch(new URL(`/api/Product/?page=${page}&limit=${productPerPage}`, apiEndpoint))
      .then(async response => {
        // console.log(response);
        if (response.ok) {
          let responseJson = await response.json();
          // console.log(responseJson);
          setTotalPages(responseJson.totalPages);
          setTotalItems(responseJson.totalItems);
          setCurrentPage(responseJson.currentPage)
          setProductList(responseJson.items);
          setLoading(false);
        }
      }, (err) => {
        console.error(err);
      })
  }, [page]);

  return (
    loading ? <Spinner /> :
      <Container mt="2rem">
        <Grid container spacing={6}>
          {productList.map((item, ind) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
              <ProductCard1 id={item.id} imgUrl={item.imageUrl} title={item.name}
                price={item.discountPrice ?? item.price}
                originalPrice={item.discountPrice ? item.price : null} />
            </Grid>
          ))}
        </Grid>

        <FlexBox
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          my="4rem"
        >
          <SemiSpan>{renderProductCount()}</SemiSpan>
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onChange={(e) => handlePageChange(e)}
          />
        </FlexBox>
      </Container>
  );
};

SalePage.layout = SaleLayout;

export default SalePage;
