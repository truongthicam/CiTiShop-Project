import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Spinner from "@component/Spinner";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { UserDto } from "@utils/apiTypes";
import { apiEndpoint } from "@utils/constants";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Profile = () => {
  const [infoLoading, setInfoLoading] = useState(true);
  const [userInfoList, setUserInfoList] = useState<number[]>(undefined);
  // const [imageSrc, setImageSrc] = useState("");
  const [user, setUser] = useState<UserDto>(undefined);
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userJson = localStorage.getItem('User');
    if (!userJson) {
      router.replace("/403");
    } else {
      let userDto: UserDto = JSON.parse(userJson);
      setUser(userDto);

      fetch(new URL(`/api/Report/${userDto.email}`, apiEndpoint).href)
        .then(async response => {
          let data: number[] = await response.json();
          if (response.ok) {
            setUserInfoList(data);
            setInfoLoading(false);
          }
        }, (err) => {
          console.error(err);
        });

      // fetch(new URL(`/api/Image/${userDto.email}`, apiEndpoint).href)
      //   .then(async response => {
      //     let data: string = await response.json();
      //     if (response.ok && !data.endsWith('/')) {
      //       setImageSrc(data);
      //     }
      //   }, (err) => {
      //     console.error(err);
      //   });
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('CreateInvoice');
    router.push("/");
  }

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="T??i kho???n c???a t??i"
        button={
          <Link href="/profile/edit">
            <Button color="primary" bg="primary.light" px="2rem">
              Ch???nh s???a
            </Button>
          </Link>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src={""} size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{String(user?.fullName)}</H5>
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
              {/* TODO: Replace with API */}
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
      </TableRow>

      <Button color="primary" bg="primary.light" px="2rem" marginTop="2rem" onClick={handleLogout}>
        ????ng xu???t &nbsp;<Icon size="20px">logout</Icon>
      </Button>
    </div>
  );
};

const infoList = [
  {
    title: "05",
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

Profile.layout = DashboardLayout;

export default Profile;
