import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import api from "api/cubApi";

// ================================================================
const BookIntroBuyer = ({ bookingUser, trade_uid }) => {
  const [bookingState, setBookingState] = useState(null);
  const [tradeUser, setTradeUser] = useState(null);
  const [accountNum, setAccountNum] = useState(null);

  useEffect(() => {
    const my_uid = sessionStorage.getItem("user_uid");
    if (bookingUser === null) {
      setBookingState("예약전");
    } else {
      for (const el of bookingUser) {
        if (el.user_uid == my_uid) {
          setBookingState(el.state);
          setTradeUser(el);
          break;
        }
        setBookingState("예약전");
      }
    }
  }, [bookingUser]);

  useEffect(() => {
    console.log("bookingState", bookingState);
  }, [bookingState]);

  const postBooking = async () => {
    await api
      .BookingBuy({
        user_uid: sessionStorage.getItem("user_uid"),
        trade_uid: trade_uid,
      })
      .then(response => {
        if (response.status === 200) {
          setBookingState("예약신청");
          setTradeUser({
            booking_uid: response.data,
            user_uid: sessionStorage.getItem("user_uid"),
            trade_uid: trade_uid,
            state: "예약신청",
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBooking = async () => {
    await api
      .CancleBuy(tradeUser.booking_uid)
      .then(response => {
        if (response.status === 200) {
          setBookingState("예약전");
          setTradeUser(null);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkAccount = async () => {
    await api
      .AccountInfo(trade_uid, sessionStorage.getItem("user_uid"))
      .then(response => {
        setAccountNum(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  switch (bookingState) {
    case "예약전":
      return (
        <Button color='primary' variant='contained' onClick={postBooking}>
          구매예약
        </Button>
      );
    case "예약신청":
      return (
        <Button color='primary' variant='contained' onClick={deleteBooking}>
          예약취소
        </Button>
      );
    case "계좌전달":
      return (
        <>
          {!accountNum && (
            <>
              <p>판매자로부터 계좌 정보를 받았습니다.</p>
              <Button
                color='primary'
                variant='contained'
                onClick={checkAccount}
              >
                계좌확인
              </Button>
            </>
          )}
          {accountNum && (
            <p>
              {accountNum.bank_name} {accountNum.bank_code}{" "}
              {accountNum.bank_user}
            </p>
          )}
        </>
      );
    default:
      return null;
  }
};
export default BookIntroBuyer;
