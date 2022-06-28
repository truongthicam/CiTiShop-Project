import Head from "next/head";
import React from "react";
import Divider from "../Divider";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigationBar from "../mobile-navigation/MobileNavigationBar";
import SaleNavbar from "../navbar/SaleNavbar";
import Sticky from "../sticky/Sticky";
import Topbar from "../topbar/Topbar";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
};

const SaleLayout: React.FC<Props> = ({
  children,
  title = "CiTi Shop | Sản phẩm",
}) => {
  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar />
      <Header />
      <Divider />
      <Sticky fixedOn={0}>
        <SaleNavbar saleCategoryList={saleCategoryList} />
      </Sticky>
      <div className="section-after-sticky">{children}</div>
      <MobileNavigationBar />
      <Footer />
    </StyledAppLayout>
  );
};

const saleCategoryList = [
  {
   
    title: "Son",
  },
  {
    
    title: "Kem chống nắng",
  },
  {
    title: "Kem dưỡng",
  },
  {
    title: "Phấn mắt",
  },
  {
    title: "Toner",
  },
  {
    title: "Mặt nạ",
  },
  {
    title: "Nước Hoa",
  },
  {
    title: "Tẩy trang",
  },
  {
    title: "Tinh chất/Serum",
  },
  {
    title: "Tẩy tế bào chết",
  },
  {
    title: "Sữa tắm",
  },
  {
    title: "Dưỡng thể",
  },
];

export default SaleLayout;
