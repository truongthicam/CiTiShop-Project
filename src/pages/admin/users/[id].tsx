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
  const [infoLoading, setInfoLoading] = useState(true);
  const [userInfoList, setUserInfoList] = useState<number[]>(undefined);
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

      fetch(new URL(`/api/Report/${id}`, apiEndpoint).href)
        .then(async response => {
          let data: number[] = await response.json();
          if (response.ok) {
            setUserInfoList(data);
            setInfoLoading(false);
          }
        }, (err) => {
          console.error(err);
        });

    }
  }, [id]);

  const handleSubmit = async () => {
    setButtonDisable(true);
    if (user.email === admin.email) {
      alert('Kh??ng th??? thay ?????i ph??n quy???n ch??nh t??i kho???n.');
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
      alert('Ch???nh s???a th??ng tin th??nh c??ng!');
      router.push('/admin/users');
    } else if (response.status == 400) {
      // console.log(data);
      const errors = data.errors;
      if (errors.isAdmin) alert(`Ph??n quy???n t??i kho???n: ${Array(...errors.isAdmin).pop()}`);

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
          title="T??i kho???n"
          button={
            <Button color="primary" bg="primary.light" px="2rem" onClick={handleSubmit} disabled={buttonDisable}>
              Ph??n quy???n t??i kho???n th??nh &nbsp;{user?.isAdmin ? '"Kh??ch H??ng"' : '"Nh??n Vi??n"'} &nbsp;{buttonDisable && <Spinner />}
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
                      <H5 my="0px">{user.fullName}</H5>
                      <FlexBox alignItems="center">
                        <Typography fontSize="14px" color="text.hint">
                          T??ch l??y:
                        </Typography>
                        <Typography ml="4px" fontSize="14px" color="primary.main">
                          {infoLoading ? '...' : userInfoList[4]} VND
                        </Typography>
                      </FlexBox>
                    </div>

                    <Typography
                      ontSize="14px"
                      color="text.hint"
                      letterSpacing="0.2em"
                    >
                      H???ng B???c
                    </Typography>
                  </FlexBox>
                </Box>
              </FlexBox>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Grid container spacing={4}>
                {infoLoading ? <Spinner /> : infoList.map((item, ind) => (
                  <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                    <FlexBox
                      as={Card}
                      flexDirection="column"
                      alignItems="center"
                      height="100%"
                      p="1rem 1.25rem"
                    >
                      <H3 color="primary.main" my="0px" fontWeight="600">
                        {userInfoList[ind]}
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
              H??? t??n
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
              S??? ??i???n tho???i
            </Small>
            <span>{user?.phoneNumber ?? 'Ch??a c??'}</span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Sinh nh???t
            </Small>
            <span className="pre">
              {/* {user?.dateOfBirth ? user?.dateOfBirth.slice(0, 10) : 'Ch??a c??'} */}
              {user?.dateOfBirth ? format(new Date(`${user.dateOfBirth}Z`), "dd-MM-yyyy") : 'Ch??a c??'}
            </span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Tr???ng th??i
            </Small>
            <span className="pre">
              {user?.emailConfirmed ? "Ho???t ?????ng" : "Kho??"}
            </span>
          </FlexBox>
          <FlexBox flexDirection="column" p="0.5rem">
            <Small color="text.muted" mb="4px">
              Ph??n quy???n
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
    subtitle: "????n h??ng",
  },
  {
    title: "02",
    subtitle: "Ch??? x??c nh???n",
  },
  {
    title: "02",
    subtitle: "??ang giao",
  },
  {
    title: "01",
    subtitle: "???? giao",
  },

];

ProfileUser.layout = AdminDashboardLayout;

export default ProfileUser;
