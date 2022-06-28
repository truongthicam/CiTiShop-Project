import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Select from "@component/Select";
import TableRow from "@component/TableRow";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import Typography, { H5, H6 } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <DashboardPageHeader
        title="Chi tiết đơn hàng"
        iconName="bag_filled"
        button={
          <Link href="/admin/orders">
            <Button color="primary" bg="primary.light" px="2rem">
              Danh sách đơn hàng
            </Button>
          </Link>
        }
      />

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox
            className="pre"
            flex="0 0 0 !important"
            m="6px"
            alignItems="center"
          >
            <Typography fontSize="14px" color="text.muted" mr="4px">
              ID:
            </Typography>
            <Typography fontSize="14px">{id}</Typography>
          </FlexBox>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Ngày đặt:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(), "dd/MM/yyyy")}
            </Typography>
          </FlexBox>
          
          <Box maxWidth="290px">
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Cập nhật trạng thái:
            </Typography>
            <Select 
            placeholder="Trạng thái đơn hàng" 
            options={orderStatusList} 
            defaultValue={orderStatusList[0]}//trạng thái đơn hàng thực
            name="status"
            />
          </FlexBox>
          </Box>
        </TableRow>

        <Box p="1rem 1.5rem 10px">
          {/* <TextField label="thêm sản phẩm" fullwidth /> */}
          <H5 mt="0px" mb="14px">
              Danh sách sản phẩm
            </H5>
        </Box>

        <Box py="0.5rem">
          {[1, 2, 3].map((item) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={item}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src="/assets/images/products/kcnanness.jpg" size={64} />
                <Box ml="20px">
                  <H6 my="0px">Kem chống nắng Anness</H6>
                  <FlexBox alignItems="center">
                    <Typography fontSize="14px" color="text.muted">
                      Số lượng: 
                    </Typography>
                    <Box maxWidth="60px" ml="8px" mt="0.25rem">
                      <TextField defaultValue={3} type="number" fullwidth /> 
                      
                    </Box>
                  </FlexBox>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Giá gốc: 420.000 VND
                </Typography>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Giá mua: 400.000 VND
                </Typography>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px" mb="1.5rem">
            <H5 mt="0px" mb="14px">
              Thông tin giao hàng
            </H5>
            <FlexBox flex="1 1 260px" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted">
                  Người nhận:&nbsp; 
                </Typography>
                <H6 my="0px">Cam Cam</H6>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Số điện thoại:&nbsp; 
                </Typography>
                <H6 my="0px">0383060695</H6>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Địa chỉ:&nbsp; 
                </Typography>
                <H6 my="0px">01 Võ Văn Ngân, Thủ Đức</H6>
              </FlexBox>
            {/* <TextArea
              defaultValue="01 Võ Văn Ngân, Thủ Đức"
              rows={5}
              borderRadius={10}
              fullwidth
            /> */}
          </Card>

          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Ghi chú
            </H5>
            <TextArea
              defaultValue="Giao giờ hành chính"
              rows={5}
              borderRadius={10}
              fullwidth
            />
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px" mb="1.5rem">
            <H5 mt="0px" mb="14px">
              Tổng đơn
            </H5>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Tổng tiền hàng:
              </Typography>
              <H6 my="0px">1.200.000 VND</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Phí vận chuyển:
              </Typography>
              <FlexBox
                alignItems="center"
                maxWidth="100px"
                ml="8px"
                mt="0.25rem"
              >
                <H6 my="0px">15.000 VND</H6>
              </FlexBox>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Giảm phí vận chuyển:
              </Typography>
              <FlexBox
                alignItems="center"
                maxWidth="100px"
                ml="8px"
                mt="0.25rem"
              >
                <H6 my="0px">- 15.000 VND</H6>
              </FlexBox>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Voucher:
              </Typography>
              <FlexBox
                alignItems="center"
                maxWidth="100px"
                ml="8px"
                mt="0.25rem"
              >
                <H6 my="0px">- 25.000 VND</H6>
              </FlexBox>
            </FlexBox>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Tổng tiền</H6>
              <H6 my="0px">1.175.000 VND</H6>
            </FlexBox>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="0.5rem"
            >
              <Typography fontSize="14px" color="text.hint">
                Phương thức thanh toán:
              </Typography>
              <FlexBox
                alignItems="center"
                maxWidth="100px"
                ml="8px"
                mt="0.25rem"
              >
                <H6 my="0px">Thanh toán khi nhận hàng</H6>
              </FlexBox>
            </FlexBox>
          </Card>

          <Button variant="contained" color="primary" ml="auto">
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const orderStatusList = [
  {
    label: "Đang giao",
    value: "Đang giao",
  },
  {
    label: "Chờ xác nhận",
    value: "Chờ xác nhận",
  },
  {
    label: "Đã giao",
    value: "Đã giao",
  },
  {
    label: "Đã hủy",
    value: "Đã hủy",
  },
];
OrderDetails.layout = AdminDashboardLayout;

export default OrderDetails;
