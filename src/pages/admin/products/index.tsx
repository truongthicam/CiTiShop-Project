import Avatar from "@component/avatar/Avatar";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import Link from "next/link";

const Products = () => {
  return (
    <div>
      <DashboardPageHeader title="Danh sách sản phẩm" iconName="delivery-box" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            ID
          </H5>
          <FlexBox my="0px" mx="6px" flex="2 2 220px !important">
            <H5 ml="56px" color="text.muted" textAlign="left">
              Tên
            </H5>
          </FlexBox>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Tồn kho
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Giá
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            % giảm
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Giá bán
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {productList.map((item, ind) => (
        <Link href={item.href} key={ind}>
          <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.productNo}
            </H5>
            <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
              <Avatar src={item.imgUrl} size={36} />
              <Typography textAlign="left" ml="20px">
              {item.title}
              </Typography>
            </FlexBox>
            <H5
              m="6px"
              textAlign="left"
              fontWeight="600"
              color={item.stock < 6 ? "error.main" : "inherit"}
            >
              {item.stock.toString().padStart(2, "0")}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.price} VND
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.sale} %
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {(item.price)*(1 - item.sale/100) } VND
            </H5>

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
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

const productList = [
  {
    productNo: "1",
    imgUrl: "/assets/images/products/srmcetaphil.jpg",
    title: "Sữa rửa mặt Cetaphil",
    price: 129000,
    sale: 10,
    stock: 30,
    href: "/admin/products/1",
  },
  {
    productNo: "2",
    stock: 20,
    imgUrl: "/assets/images/products/taytranglarocheposay.jpg",
    title: "Tẩy trang Laroche Posay",
    price: 499000,
    sale: 15,
    href: "/admin/products/2",
  },
  {
    productNo: "3",
    stock: 2,
    imgUrl: "/assets/images/products/kcnanness.jpg",
    title: "Kem chống nắng Anness",
    price: 400000,
    sale: 10,
    href: "/admin/products/3",
  },
  {
    productNo: "4",
    stock: 25,
    imgUrl: "/assets/images/products/son3CE.jpg",
    title: "Son 3CE",
    price: 299000,
    sale: 5,
    href: "/admin/products/4",
  },
  {
    productNo: "5",
    stock: 1,
    imgUrl: "/assets/images/products/sonloreal.jpg",
    title: "Son Loreal",
    price: 129000,
    sale: 20,
    href: "/admin/products/5",
  },
];

Products.layout = AdminDashboardLayout;

export default Products;
