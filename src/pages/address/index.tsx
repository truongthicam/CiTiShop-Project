import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import Spinner from "@component/Spinner";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import { AddressDto, UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const AddressList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [addresses, setAddresses] = useState<AddressDto[]>([]);

  const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson)
      setUser(userDto);

      fetch(new URL(`/api/UserDeliveryAddress?userId=${userDto.id}&page=${pageNumber}`, apiEndpoint).href)
        .then(async response => {
          if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            setTotalPages(responseJson.totalPages);
            setTotalItems(responseJson.totalItems);
            setCurrentPage(responseJson.currentPage);
            setAddresses(responseJson.items);
            setLoading(false);
          }
        }, (err) => {
          console.log(err);
        })
    }
  }, [pageNumber])

  const togglePageChange = useCallback((selected: number) => {
    // console.log(selected);
    setPageNumber(selected + 1);
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    let response = await fetch(new URL(`/api/UserDeliveryAddress/${user.id}/${id}`, apiEndpoint).href, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    // console.log(response);
    if (response.ok) {
      alert('Xoá thông tin thành công!');
      router.reload();
    } else {
      alert(response.status);
    }
  }

  return (
    loading ? <Spinner /> :
      <div>
        <DashboardPageHeader
          title="Sổ địa chỉ"
          iconName="pin_filled"
          button={
            <Link href="/address/create">
              <Button color="primary" bg="primary.light" px="2rem">
                Thêm địa chỉ
              </Button>
            </Link>
          }
        />

        {addresses.map((item) => (
          <TableRow my="1rem" padding="6px 18px" id={item.id}>
            <Typography className="pre" m="6px" textAlign="left">
              {item.receiverName}
            </Typography>
            <Typography flex="1 1 260px !important" m="6px" textAlign="left">
              {item.deliveryAddress}
            </Typography>
            <Typography className="pre" m="6px" textAlign="left">
              {item.phoneNumber}
            </Typography>

            <Typography className="pre" textAlign="center" color="text.muted">
              <Link href={`/address/${item.id}`}>
                <Typography as="a" href={`/address/${item.id}`} color="inherit">
                  <IconButton size="small">
                    <Icon variant="small" defaultcolor="currentColor">
                      edit
                    </Icon>
                  </IconButton>
                </Typography>
              </Link>
              <IconButton size="small" onClick={(e) => handleDelete(e, item.id)}>
                <Icon variant="small" defaultcolor="currentColor">
                  delete
                </Icon>
              </IconButton>
            </Typography>
          </TableRow>
        ))}

        <FlexBox justifyContent="center" mt="2.5rem">
          {totalItems === 0 ? <H5 style={{ textAlign: 'center' }}>Không có địa chỉ nào.</H5> :
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onChange={togglePageChange}
            />
          }
        </FlexBox>
      </div>
  );
};

// const orderList = [
//   {
//     orderNo: "1050017AS",
//     status: "Chờ xác nhận",
//     purchaseDate: new Date(),
//     price: 35000,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Chờ xác nhận",
//     purchaseDate: new Date(),
//     price: 500000,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Đã giao",
//     purchaseDate: "2022/04/23",
//     price: 700000,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Đã giao",
//     purchaseDate: "2022/05/29",
//     price: 700000,
//   },
//   {
//     orderNo: "1050017AS",
//     status: "Hủy",
//     purchaseDate: "2022/06/06",
//     price: 30000,
//   },
// ];

AddressList.layout = DashboardLayout;

export default AddressList;
