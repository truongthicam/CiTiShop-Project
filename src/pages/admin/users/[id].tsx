import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileUser = () => {
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [user, setUser] = useState<UserDto>(undefined);
  const [admin, setAdmin] = useState<UserDto>(undefined);
  const router = useRouter();
  const { id } = router.query

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      if (userDto.isAdmin) {
        setAdmin(userDto);
      } else {
        router.replace("/403");
      }
    }

    if (id) {
      // console.log(id);
      fetch(new URL(`/api/User/${id}`, apiEndpoint).href)
        .then(async response => {
          // console.log(response);
          let userJson: UserDto = await response.json();
          if (response.ok) {
            setUser(userJson);
            setLoading(false);
          } else {
            router.replace("/404");
          }
        }, (err) => {
          console.error(err);
        })
    }
  }, [id]);

  const handleSubmit = async () => {
    setButtonDisable(true);
    if (user.email === admin.email) {
      alert('Không thể thay đổi phân quyền chính tài khoản.');
      return;
    }

    let values = { isAdmin: !user.isAdmin }
    let response = await fetch(new URL(`/api/User/${user.email}/Role`, apiEndpoint).href, {
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
      alert('Chỉnh sửa thông tin thành công!');
      router.push('/admin/users');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.isAdmin) alert(`Phân quyền tài khoản: ${Array(...errors.isAdmin).pop()}`);

    } else {
      alert(response.status);
    }

    // console.log(values);
    setButtonDisable(false);
  };

  return (
    loading ? <Spinner /> :
      <div>
        <DashboardPageHeader
          iconName="user_filled"
          title="Tài khoản"
          button={
            <Button color="primary" bg="primary.light" px="2rem" onClick={handleSubmit} disabled={buttonDisable}>
              Phân quyền tài khoản thành &nbsp;{user?.isAdmin ? '"Khách Hàng"' : '"Nhân Viên"'} &nbsp;{buttonDisable && <Spinner />}
            </Button>
          }
        />

        <Box mb="30px">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
                <Avatar src="" size={64} />
                <Box ml="12px" flex="1 1 0">
                  <FlexBox
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div>
                      <H5 my="0px">Trương Thị Cam</H5>
                      <FlexBox alignItems="center">
                        <Typography fontSize="14px" color="text.hint">
                          Tích lũy:
                        </Typography>
                        <Typography ml="4px" fontSize="14px" color="primary.main">
                          200.000 VND
                        </Typography>
                      </FlexBox>
                    </div>

                    <Typography
                      ontSize="14px"
                      color="text.hint"
                      letterSpacing="0.2em"
                    >
                      Hạng Bạc
                    </Typography>
                  </FlexBox>
                </Box>
              </FlexBox>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={4}>
                {infoList.map((item) => (
                  <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                    <FlexBox
                      as={Card}
                      flexDirection="column"
                      alignItems="center"
                      height="100%"
                      p="1rem 1.25rem"
                    >
                      <H3 color="primary.main" my="0px" fontWeight="600">
                        {item.title}
                      </H3>
                      <Small color="text.muted" textAlign="center">
                        {item.subtitle}
                      </Small>
                    </FlexBox>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <TableRow p="0.75rem 1.5rem">
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              ID
            </Small>
            <span>{String(user?.id)}</span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Họ tên
            </Small>
            <span>{String(user?.fullName)}</span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Email
            </Small>
            <span>{String(user?.email)}</span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px" textAlign="left">
              Số điện thoại
            </Small>
            <span>{user?.phoneNumber ?? 'Chưa có'}</span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Sinh nhật
            </Small>
            <span className="pre">
              {/* {user?.dateOfBirth ? user?.dateOfBirth.slice(0, 10) : 'Chưa có'} */}
              {user?.dateOfBirth ? format(new Date(`${user.dateOfBirth}Z`), "dd-MM-yyyy") : 'Chưa có'}
            </span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Trạng thái
            </Small>
            <span className="pre">
              {user?.emailConfirmed ? "Hoạt động" : "Khoá"}
            </span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Phân quyền
            </Small>
            <span className="pre">
              {user?.isAdmin ? 'NV' : 'KH'}
            </span>
          </FlexBox>
        </TableRow>
      </div>
  );
};

const infoList = [
  {
    title: "06",
    subtitle: "Đơn hàng",
  },
  {
    title: "02",
    subtitle: "Chờ xác nhận",
  },
  {
    title: "02",
    subtitle: "Đang giao",
  },
  {
    title: "01",
    subtitle: "Đã giao",
  },

];

ProfileUser.layout = AdminDashboardLayout;

export default ProfileUser;
