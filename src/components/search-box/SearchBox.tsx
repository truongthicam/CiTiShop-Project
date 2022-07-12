import Card from "@component/Card";
import { Span } from "@component/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";

export interface SearchBoxProps { }

const SearchBox: React.FC<SearchBoxProps> = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(null);
  const [category, setCategory] = useState("Tất cả");
  const [resultList, setResultList] = useState([]);

  const handleCategoryChange = (cat) => () => {
    setCategory(cat);
  };

  // const search = debounce((e) => {
  //   const value = e.target?.value;
  //   setSearchTerm(value);
  //   // console.log(value, !value);
  //   if (!value) setResultList([]);
  //   else setResultList(dummySearchResult);
  // }, 200);

  // const hanldeSearch = useCallback((event) => {
  //   event.persist();
  //   search(event);
  // }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setSearchTerm(value);
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // console.log(searchTerm, e.key);
      const value = searchTerm.trim();
      router.push(`/product/search/${value}`);
    }
  }

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>
        <TextField
          className="search-field"
          placeholder="Tìm kiếm..."
          fullwidth
          onChange={(e) => handleSearchTerm(e)}
          onKeyPress={(e) => handleEnterKey(e)}
        />
        <Menu
          className="category-dropdown"
          direction="right"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          {categories.map((item) => (
            <MenuItem key={item} onClick={handleCategoryChange(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
        {/* <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box> */}
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

const categories = [
  //Các danh mục sản phẩm trong db
  //Database Citishop
  "Tất cả",
  "Kem chống nắng",
  "Sữa rửa mặt",
  "Phấn mắt",
  "Tẩy trang",
  "Mặt nạ",
  "Toner",
  "Kem dưỡng",
];

// const dummySearchResult = [
//   //Database Citishop Tất cả sản phẩm để hiển thị gợi ý khi tìm kiếm
// ];

export default SearchBox;
