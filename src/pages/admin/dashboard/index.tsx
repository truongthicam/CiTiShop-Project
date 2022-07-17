import Card from "@component/Card";
import AdminAnalyticsChart from "@component/dashboard/AdminAnalyticsChart";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import Typography, { H1, H5, Paragraph } from "@component/Typography";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [dashboardList, setDashboardList] = useState<number[]>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      if (!userDto.isAdmin) {
        router.replace("/403");
      } else {
        fetch(new URL(`/api/Report/Dashboard`, apiEndpoint).href)
          .then(async response => {
            let data: number[] = await response.json();
            if (response.ok) {
              setDashboardList(data);
            }
          }, (err) => {
            console.error(err);
          });
      }
    }
  }, []);

  return (
    <div>
      <DashboardPageHeader title="Tổng quan" iconName="bag_filled" />

      <Grid container spacing={6}>
        {!dashboardList ? <Spinner /> : cardList.map((item, ind) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={ind}>
            <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
              <H5 color="text.muted" mb="8px">
                {item.title}
              </H5>
              <H1 color="gray.700" mb="4px" lineHeight="1.3">
                {dashboardList[ind]}
              </H1>
              <Paragraph color="text.muted">{item.subtitle}</Paragraph>
            </Typography>
          </Grid>
        ))}

        <Grid item lg={12} xs={12}>
          <Card p="20px 30px">
            <H5 mb="1.5rem">Doanh số trong tháng</H5>
            <AdminAnalyticsChart />
          </Card>
        </Grid>


      </Grid>
    </div>
  );
};

const cardList = [
  {
    title: "Doanh thu",
    amount: "1000000",
    subtitle: "Tháng",
  },
  // {
  //   title: "Lợi nhuận",
  //   amount: "500000",
  //   subtitle: "Tháng",
  // },
  {
    title: "Tổng số tài khoản",
    amount: "15",
    subtitle: "",
  },

  {
    title: "Tổng số đơn hàng",
    amount: "08",
    subtitle: "",
  },
  {
    title: "Chờ thanh toán",
    amount: "02",
    subtitle: "Đơn hàng",
  },
  {
    title: "Thanh toán thành công",
    amount: "02",
    subtitle: "Đơn hàng",
  },
  {
    title: "Thanh toán thất bại",
    amount: "02",
    subtitle: "Đơn hàng",
  },
];

AdminDashboard.layout = AdminDashboardLayout;

export default AdminDashboard;
