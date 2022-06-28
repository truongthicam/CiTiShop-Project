import Card from "@component/Card";
import AdminAnalyticsChart from "@component/dashboard/AdminAnalyticsChart";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography, { H1, H5, Paragraph } from "@component/Typography";

const AdminDashboard = () => {
  return (
    <div>
      <DashboardPageHeader title="Tổng quan" iconName="bag_filled" />

      <Grid container spacing={6}>
        {cardList.map((item, ind) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={ind}>
            <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
              <H5 color="text.muted" mb="8px">
                {item.title}
              </H5>
              <H1 color="gray.700" mb="4px" lineHeight="1.3">
                {item.amount}
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
  {
    title: "Lợi nhuận",
    amount: "500000",
    subtitle: "Tháng",
  },
  {
    title: "Khách hàng mới",
    amount: "15",
    subtitle: "",
  },
  
  {
    title: "Đơn hàng đã đặt",
    amount: "08",
    subtitle: "",
  },
  {
    title: "Đơn hàng mới",
    amount: "02",
    subtitle: "",
  },
  {
    title: "Đơn hàng hủy",
    amount: "02",
    subtitle: "",
  },
  
];



AdminDashboard.layout = AdminDashboardLayout;

export default AdminDashboard;
