import Link from "next/link";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { Place, ShoppingBag } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableRow from "components/TableRow";
import { H5, Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { withAuth } from "../../hocs/withAuth ";
import api from "api/cubApi";

// ====================================================

const getColor = status => {
  switch (status) {
    case "등록중":
      return "secondary";

    case "판매완료":
      return "secondary";

    case "예약중":
      return "info";

    case "판매중":
      return "success";

    case "판매취소":
      return "error";

    default:
      return "";
  }
};

const My = () => {
  let user_id;
  const [data, setData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(() => {
    user_id = sessionStorage.getItem("user_uid");
    getUserBookInfo(15, 0);
  }, []);

  useEffect(() => {
    getUserBookInfo(15, start);
  }, [start]);

  const getUserBookInfo = async (user_uid, start) => {
    const response = await api.UserBookInfo(user_uid, start);
    setData(response.data);
    setTotalPage(Math.ceil(response.total / 10));
  };

  const handlePageChange = (event, value) => {
    if (value === 1) setStart(0);
    else setStart((value - 1) * 10);
  };

  const NEWBOOK_BUTTON = (
    <Link href='/my/create'>
      <Button
        color='primary'
        sx={{
          px: 4,
          bgcolor: "primary.light",
        }}
      >
        판매 등록
      </Button>
    </Link>
  );

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title='판매중인 책'
        icon={ShoppingBag}
        button={NEWBOOK_BUTTON}
        navigation={<CustomerDashboardNavigation />}
      />

      {data ? (
        data.map((item, index) => (
          <TableRow
            sx={{
              my: "1rem",
              p: "15px 24px",
            }}
            key={index}
          >
            <Box>
              <span>{item.title}</span>
              <Span m={0.75} color='grey.600'>
                | {item.sell_price}원
              </Span>
              <FlexBox alignItems='center' flexWrap='wrap' pt={1} m={-0.75}>
                <Chip
                  size='small'
                  label={item.sell_state}
                  sx={{
                    p: "0.25rem 0.5rem",
                    fontSize: 12,
                    color: !!getColor(item.sell_state)
                      ? `${getColor(item.sell_state)}.900`
                      : "inherit",
                    backgroundColor: !!getColor(item.sell_state)
                      ? `${getColor(item.sell_state)}.100`
                      : "none",
                  }}
                />
                {item.shop_name && (
                  <Span m={0.75} color='grey.600'>
                    <Place
                      fontSize='small'
                      color='inherit'
                      style={{
                        position: "relative",
                        top: "3px",
                      }}
                    />{" "}
                    {item.shop_name}
                  </Span>
                )}
              </FlexBox>
            </Box>

            <Typography
              flex='0 0 0 !important'
              textAlign='center'
              color='grey.600'
            >
              {item.sell_state !== "예약중" &&
              item.sell_state !== "판매완료" ? (
                <Link href={`/my/${item.trade_uid}`} key={index} passHref>
                  <IconButton>
                    <ModeEditIcon fontSize='small' color='inherit' />
                  </IconButton>
                </Link>
              ) : null}
            </Typography>
          </TableRow>
        ))
      ) : (
        <Box p='60px' display='flex' bgcolor='#fff' borderRadius='5px'>
          <H5>판매중인 책이 없습니다.</H5>
        </Box>
      )}

      {totalPage > 1 && (
        <FlexBox justifyContent='center' mt={5}>
          <Pagination
            count={totalPage}
            color='primary'
            variant='outlined'
            onChange={handlePageChange}
          />
        </FlexBox>
      )}
    </CustomerDashboardLayout>
  );
};

export default withAuth(My);
