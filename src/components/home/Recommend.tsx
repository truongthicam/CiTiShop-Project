import Spinner from "@component/Spinner";
import { ProductDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import React, { useEffect, useState } from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Recommend: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<ProductDto[]>([]);

  useEffect(() => {
    setLoading(true);
    // console.log(id);
    fetch(new URL(`/api/Product/Random/?count=${12}`, apiEndpoint))
      .then(async response => {
        // console.log(response);
        if (response.ok) {
          let responseJson = await response.json();
          // console.log(responseJson);
          setTotalItems(responseJson.totalItems);
          setItems(responseJson.items);
          setLoading(false);
        }
      }, (err) => {
        console.error(err);
      })
  }, []);

  return (
    <Container mb="70px">
      <CategorySectionHeader title="Gợi ý riêng cho bạn" seeMoreLink="#" />
      {loading ? <Spinner /> : totalItems === 0 ? <></> : <Grid container spacing={6}>
        {items.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 hoverEffect id={item.id} imgUrl={item.imageUrl} title={item.name}
              price={item.discountPrice ?? item.price}
              originalPrice={item.discountPrice ? item.price : null} rating={4.75} />
          </Grid>
        ))}
      </Grid>}
    </Container>
  );
};

export default Recommend;
