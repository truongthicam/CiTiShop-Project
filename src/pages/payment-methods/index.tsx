import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddressList = () => {
  // const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    }
    // else {
    //   setUser(JSON.parse(userJson));
    // }
  }, [])

  return (
    <div>
      <DashboardPageHeader
        title="Phương thức thanh toán"
        iconName="credit-card_filled"
        button={
          <Link href="/payment-methods/add">
            <a>
              <Button color="primary" bg="primary.light" px="2rem">
                Thêm
              </Button>
            </a>
          </Link>
        }
      />

      {orderList.map((item, ind) => (
        <TableRow key={ind} my="1rem" padding="6px 18px">
          <FlexBox alignItems="center" m="6px">
            <Card width="42px" height="28px" mr="10px" elevation={4}>
              <img
                width="100%"
                src={`/assets/images/payment-methods/${item.payment_method}.svg`}
                alt={item.payment_method}
              />
            </Card>
            <H5 className="pre" m="6px">
              Cam
            </H5>
          </FlexBox>
          <Typography className="pre" m="6px">
            {item.card_no}
          </Typography>
          <Typography className="pre" m="6px">
            {item.exp}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href="/payment-methods/xkssThds6h37sd">
              <Typography
                as="a"
                href="/payment-methods/xkssThds6h37sd"
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(selected) => {
            console.log(selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

const orderList = [
  {
    orderNo: "1050017AS",
    exp: "08 / 2025",
    payment_method: "Amex",
    card_no: "1234 **** **** ****",
  },
  {
    orderNo: "1050017AS",
    exp: "10 / 2025",
    payment_method: "Mastercard",
    card_no: "1234 **** **** ****",
  },
  {
    orderNo: "1050017AS",
    exp: "N/A",
    payment_method: "Momo",
    card_no: "0383060695",
  },
  {
    orderNo: "1050017AS",
    exp: "08 / 2025",
    payment_method: "Visa",
    card_no: "4224 **** **** ****",
  },
];

AddressList.layout = DashboardLayout;

export default AddressList;
