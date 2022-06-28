import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Box from "@component/Box";
import Divider from "@component/Divider";
import Grid from "@component/grid/Grid";
import Header from "@component/header/Header";
import MobileCategoryImageBox from "@component/mobile-category-nav/MobileCategoryImageBox";
import { MobileCategoryNavStyle } from "@component/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Typography from "@component/Typography";
import navigations from "@data/navigations";
import Link from "next/link";
import React, { Fragment, useState } from "react";

const MobileCategoryNav = () => {
  const [category, setCategory] = useState(null);
  // const [suggestedList, setSuggestedList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleCategoryClick = (cat) => () => {
    let menuData = cat.menuData;
    if (menuData) {
      setSubCategoryList(menuData.categories || menuData);
    } else setSubCategoryList([]);
    setCategory(cat);
  };

  // useEffect(() => {
  //   setSuggestedList(suggestion);
  // }, []);

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />
      <div className="main-category-holder">
        {navigations.map((item) => (
          <Box
            className="main-category-box"
            borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
            onClick={handleCategoryClick(item)}
            key={item.title}
          >
            {/* <Icon size="28px" mb="0.5rem">
              {item.icon}
            </Icon> */}
            <Typography
              className="ellipsis"
              textAlign="center"
              fontSize="11px"
              lineHeight="1"
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </div>
      <Box className="container">
        {/* <Typography fontWeight="600" fontSize="15px" mb="1rem">
          Đề xuất
        </Typography> */}
        {/* <Box mb="2rem">
          <Grid container spacing={3}>
            {suggestedList.map((item, ind) => (
              <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
              
                <Link href="/product/search/423423">
                  <a>
                    <MobileCategoryImageBox {...item} />
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box> */}

        {category?.menuComponent === "MegaMenu1" ? (
          subCategoryList.map((item, ind) => (
            <Fragment key={ind}>
              <Divider />
              <Accordion>
                <AccordionHeader px="0px" py="10px">
                  <Typography fontWeight="600" fontSize="15px">
                    {item.title}
                  </Typography>
                </AccordionHeader>
                <Box mb="2rem" mt="0.5rem">
                  <Grid container spacing={3}>
                    {item.subCategories?.map((item, ind) => (
                      <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                         {/* Database Citishop */}
                        <Link href="/product/search/423423">
                          <a>
                            <MobileCategoryImageBox {...item} />
                          </a>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Accordion>
            </Fragment>
          ))
        ) : (
          <Box mb="2rem">
            <Grid container spacing={3}>
              {subCategoryList.map((item, ind) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                  <Link href="/product/search/423423">
                    <a>
                      <MobileCategoryImageBox {...item} />
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};



export default MobileCategoryNav;
