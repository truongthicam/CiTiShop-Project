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
import Spinner from "@component/Spinner";
import TableRow from "@component/TableRow";
// import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import Typography, { H5, H6 } from "@component/Typography";
import { InvoiceFullDetailDto, InvoiceProductDto, UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const OrderDetails = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoiceDetail, setInvoiceDetail] = useState<InvoiceFullDetailDto>(undefined);
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductDto[]>(undefined);
  const [deliveryIndex, setDeliveryIndex] = useState<number>(0);
  const router = useRouter();
  const { id } = router.query;

  const [deliveryStatus, setDeliveryStatus] = useState<number>(undefined);
  const [deliveryDescription, setDeliveryDescription] = useState<string>("");

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      if (!userDto.isAdmin) {
        router.replace("/403");
      }
    }

    if (id) {
      fetch(new URL(`/api/Invoice/${id}/details`, apiEndpoint).href)
        .then(async response => {
          // console.log(response);
          let invoiceJson: InvoiceFullDetailDto = await response.json();
          if (response.ok) {
            // console.log(invoiceJson);
            setDeliveryIndex(getDeliveryIndex(invoiceJson.deliveryStatus));
            setInvoiceDetail(invoiceJson);
            setInvoiceProducts(invoiceJson.invoiceProducts);

            setDeliveryStatus(getDeliveryIndex(invoiceJson.deliveryStatus));
            setDeliveryDescription(invoiceJson.deliveryDescription);
            setLoading(false);
          } else {
            router.replace("/404");
          }
        }, (err) => {
          console.error(err);
        })
    }
  }, [id]);

  const handleDeliveryIndexChange = (e: any) => {
    console.log(e.label, e.value);
    setDeliveryStatus(e.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e);
    setDeliveryDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setButtonDisable(true);
    let values = {
      deliveryStatus: deliveryStatus, deliveryDescription: deliveryDescription,
    };
    console.log(values);
    let response = await fetch(new URL(`/api/Invoice/${invoiceDetail.id}`, apiEndpoint).href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
    });
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    if (response.ok) {
      alert('Ch???nh s???a th??ng tin th??nh c??ng!');
      router.push('/admin/orders');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.deliveryStatus) alert(`C???p nh???t tr???ng th??i: ${Array(...errors.deliveryStatus).pop()}`);
      else if (errors.description) alert(`M?? t???: ${Array(...errors.description).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  const getDeliveryIndex = (deliveryStatus): number => {
    switch (deliveryStatus) {
      case "Ch??? x??c nh???n":
        return 0;
      case "??ang giao":
        return 1;
      case "???? giao":
        return 2;
      case "???? hu???":
        return 3;
      default:
        return 0;
    }
  };

  return (
    loading ? <Spinner /> :
      <div>
        <DashboardPageHeader
          title="Chi ti???t ????n h??ng"
          iconName="bag_filled"
          button={
            <Link href="/admin/orders">
              <Button color="primary" bg="primary.light" px="2rem">
                Danh s??ch ????n h??ng
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
              <Typography fontSize="14px">{invoiceDetail.id}</Typography>
            </FlexBox>
            <FlexBox className="pre" m="6px" alignItems="center">
              <Typography fontSize="14px" color="text.muted" mr="4px">
                Ng??y ?????t:
              </Typography>
              <Typography fontSize="14px">
                {format(new Date(`${invoiceDetail.dateOrdered}Z`), "dd/MM/yyyy")}
              </Typography>
            </FlexBox>

            <Box maxWidth="290px">
              <FlexBox className="pre" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted" mr="4px">
                  C???p nh???t tr???ng th??i:
                </Typography>
                <Select
                  placeholder="Tr???ng th??i ????n h??ng"
                  options={deliveryStatusList}
                  defaultValue={deliveryStatusList[deliveryIndex]}//tr???ng th??i ????n h??ng th???c
                  onChange={handleDeliveryIndexChange}
                  name="deliveryStatus"
                />
              </FlexBox>
            </Box>
          </TableRow>

          <Box p="1rem 1.5rem 10px">
            {/* <TextField label="th??m s???n ph???m" fullwidth /> */}
            <H5 mt="0px" mb="14px">
              Danh s??ch s???n ph???m
            </H5>
          </Box>

          <Box py="0.5rem">
            {invoiceProducts.map((item) => (
              <FlexBox
                px="1rem"
                py="0.5rem"
                flexWrap="wrap"
                alignItems="center"
                key={item.productId}
              >
                <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                  <Avatar src="/assets/images/products/kcnanness.jpg" size={64} />
                  <Box ml="20px">
                    <H6 my="0px">{item.name}</H6>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.muted">
                        S??? l?????ng: {item.amount}
                      </Typography>
                      {/* <Box maxWidth="60px" ml="8px" mt="0.25rem">
                      <TextField defaultValue={3} type="number" fullwidth /> 
                      
                    </Box> */}
                    </FlexBox>
                  </Box>
                </FlexBox>
                <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                  <Typography fontSize="14px" color="text.muted">
                    Gi?? mua: {item.costPerItem} VND
                  </Typography>
                </FlexBox>
                <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                  <Typography fontSize="14px" color="text.muted">
                    T???ng gi??: {item.cost} VND
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
                Th??ng tin giao h??ng
              </H5>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Ng?????i nh???n:&nbsp;
                </Typography>
                <H6 my="0px">{invoiceDetail.receiverName}</H6>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  S??? ??i???n tho???i:&nbsp;
                </Typography>
                <H6 my="0px">{invoiceDetail.phoneNumber}</H6>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  ?????a ch???:&nbsp;
                </Typography>
                <H6 my="0px">{invoiceDetail.deliveryAddress}</H6>
              </FlexBox>
              {/* <TextArea
              defaultValue="01 V?? V??n Ng??n, Th??? ?????c"
              rows={5}
              borderRadius={10}
              fullwidth
            /> */}
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Ng??y giao h??ng:&nbsp;
                </Typography>
                <H6 my="0px">{invoiceDetail.dateDelivered ? format(new Date(`${invoiceDetail.dateDelivered}Z`), "dd/MM/yyyy") : "Ch??a c??"}</H6>
              </FlexBox>
            </Card>

            <Card p="20px 30px">
              <H5 mt="0px" mb="14px">
                Ghi ch??
              </H5>
              <TextArea
                defaultValue={`${invoiceDetail.deliveryDescription}`}
                rows={5}
                borderRadius={10}
                fullwidth
                onChange={handleDescriptionChange}
              />
            </Card>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Card p="20px 30px" mb="1.5rem">
              <H5 mt="0px" mb="14px">
                T???ng ????n
              </H5>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
              >
                <Typography fontSize="14px" color="text.hint">
                  T???ng ti???n h??ng:
                </Typography>
                <H6 my="0px">{invoiceDetail.totalCost} VND</H6>
              </FlexBox>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
              >
                <Typography fontSize="14px" color="text.hint">
                  Ph??:
                </Typography>
                <FlexBox
                  alignItems="center"
                  maxWidth="100px"
                  ml="8px"
                  mt="0.25rem"
                >
                  <H6 my="0px">{invoiceDetail.totalFee} VND</H6>
                </FlexBox>
              </FlexBox>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
              >
                <Typography fontSize="14px" color="text.hint">
                  Gi???m gi??:
                </Typography>
                <FlexBox
                  alignItems="center"
                  maxWidth="100px"
                  ml="8px"
                  mt="0.25rem"
                >
                  <H6 my="0px">- {invoiceDetail.discount} VND</H6>
                </FlexBox>
              </FlexBox>
              {/* <FlexBox
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
              </FlexBox> */}

              <Divider mb="0.5rem" />

              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="1rem"
              >
                <H6 my="0px">T???ng ti???n</H6>
                <H6 my="0px">{invoiceDetail.totalPayment} VND</H6>
              </FlexBox>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="0.5rem"
              >
                <Typography fontSize="14px" color="text.hint">
                  Ph????ng th???c thanh to??n:
                </Typography>
                <FlexBox
                  alignItems="center"
                  maxWidth="100px"
                  ml="8px"
                  mt="0.25rem"
                >
                  <H6 my="0px">{invoiceDetail.paymentType}</H6>
                </FlexBox>
              </FlexBox>
            </Card>

            <Button variant="contained" color="primary" ml="auto"
              onClick={handleSubmit} disabled={buttonDisable}>
              C???p nh???t &nbsp;{buttonDisable && <Spinner />}
            </Button>
          </Grid>
        </Grid>
      </div>
  );
};

const deliveryStatusList = [
  {
    label: "Ch??? x??c nh???n",
    value: 0,
  },
  {
    label: "??ang giao",
    value: 1,
  },
  {
    label: "???? giao",
    value: 2,
  },
  {
    label: "???? h???y",
    value: 3,
  },
];
OrderDetails.layout = AdminDashboardLayout;

export default OrderDetails;
