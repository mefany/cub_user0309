import axios from "axios";
//------------로그인 API ----------------//
//일반 로그인
const Login = async (data) => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/test/login`,
    data
  };
  const response = await axios(config);
  return response.data;
};

//카카오 로그인
const KakaoLogin = async (data) => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/test/login/kakao`,
    data
  };
  const response = await axios(config);
  return response.data;
};

//카카오 로그인 인가코드 받기
const KakaoLoginAuth = async (code) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/login/kakao?code=${code}`
  };
  const response = await axios(config);
  return response.data;
};

//----------- 도서 거래 API ----------------//
// 판매 도서 리스트 조회
const BookList = async (sort, start, count) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?date_order=${sort}&start=${start}&count=${count}`,
  };
  const response = await axios(config);
  return response.data.data;
};

// 단일 도서 정보 조회
const BookInfoByUid = async (trade_uid) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade/${trade_uid}`,
  };
  const response = await axios(config);
  return response.data;
};

// 판매 등록된 도서중 ISBN 조회
const IsbnBooks = async isbn => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?isbn=${isbn}`,
  };
  const response = await axios(config);
  return response.data.data;
};

//도서 ISBN 조회
const FindBookByIsbn = async isbn => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/isbn?isbn=${isbn}`,
  };
  const response = await axios(config);
  return response.data.items[0];
};

//유저 판매중 책 정보 조회
const UserBookInfo = async (user_uid, start) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?user_uid=${user_uid}&start=${start}`,
  };
  const response = await axios(config);
  return response.data;
};

//등록된 도서 검색
const SearchBook = async (title) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?title=${title}`,
  };
  const response = await axios(config);
  return response.data.data;
};

//신규 판매 등록
const NewTrade = async data => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/test/trade`,
    data
  };
  const response = await axios(config);
  return response.status;
};

//----------- 도서 API ----------------//
const NewBook = async data => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/test/book`,
    data
  };
  const response = await axios(config);
  return response.data;
};

//----------- 매장 API ----------------//
//매장 정보 조회
const StoreList = async sort => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/shop`,
  };
  const response = await axios(config);
  return response.data;
};

//단일 매장 정보 조회
const ShopInfo = async uid => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/shop/${uid}`,
  };
  const response = await axios(config);
  return response.data[0];
};

//매장 내 판매 도서 조회
const BookListByShop = async uid => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?shop_uid=${uid}`,
  };
  const response = await axios(config);
  return response.data.data;
};
//----------- 유저 API ----------------//
const UserInfo = async uid => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/user/${uid}`,
  };
  const response = await axios(config);
  return response.data[0];
};
//----------- 예약 API ----------------//
const BookingUser = async trade_uid => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/booking/${trade_uid}`,
  };
  const response = await axios(config);
  return response.data;
};

export default {
  Login,
  KakaoLogin,
  KakaoLoginAuth,
  BookList,
  BookInfoByUid,
  IsbnBooks,
  FindBookByIsbn,
  SearchBook,
  NewTrade,
  NewBook,
  StoreList,
  ShopInfo,
  BookListByShop,
  UserBookInfo,
  UserInfo,
  BookingUser,
};
