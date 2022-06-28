import Link from "next/link";
import Layout from "../components/layout/AppLayout";

const AboutPage = () => (
  <Layout title="CiTi Shop | Giới thiệu">
    <h1>GIỚI THIỆU</h1>
    <p>ĐÂY LÀ TRANG GIỚI THIỆU VỀ CITI SHOP</p>
    <p>
      <Link href="/">
        <a>Về Trang Chủ</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;
