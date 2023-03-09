import axios from "axios";

// 판매 도서 리스트 조회
const BookList = async sort => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/test/trade?date_order=${sort}`,
  };
  const response = await axios(config);
  return response.data;
};

// 공지사항/FAQ 등록
const NoticeFaqRegister = async data => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/api/admin/notice/register`,
    headers: {
      logintoken,
    },
    data,
  };
  const response = await axios(config);
  return response;
};
// 공지사항/FAQ 수정
const NoticeFaqUpdate = async (data, id) => {
  const config = {
    method: "put",
    url: `${process.env.DEV_API}/api/admin/notice/${id}/update`,
    headers: {
      logintoken,
    },
    data,
  };
  await axios(config);
};
// 공지사항/FAQ 리스트 조회
const NoticeFaqSearch = async (form, pageNum) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/api/admin/notice/list?noticeType=${
      form.noticeType
    }&startDt=${form.startDt}&endDt=${form.endDt}&showYn=${
      form.showYn
    }&searchKeyword=${form.searchKeyword}&category=${
      form.category === 2012 ? 0 : form.category
    }&pageNum=${pageNum}`,
    headers: {
      logintoken,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

// 서비스운영 별 타입 조회
const NoticeFaqSubValue = async noticeType => {
  const response = await axios.get(
    `${process.env.DEV_API}/api/notice/type/search?key=notice&subValue1=1${
      noticeType ? `&type=${noticeType}` : ""
    }`
  );
  return response.data.data.configList;
};

// 리스트 상세
const NoticeFaqDetails = async id => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/api/admin/notice/${id}/detail`,
    headers: {
      logintoken,
    },
  };
  const response = await axios(config);
  console.log(response);
  return response.data.data.noticeDetail;
};

// 푸시 리스트 조회, 파트너 리스트 조회, 앱 업데이트 버전 조회
const BoardsSearch = async (type, form, pageNum) => {
  const pushUrlDesc = `dateType=${form.dataType}&startDt=${form.startDt}&endDt=${form.endDt}&alarmType=${form.alarmType}
    &sendType=${form.sendType}&completeStatus=${form.completeStatus}&targetSenderType=${form.targetSenderType}
    &osType=${form.osType}&searchKeyword=${form.searchKeyword}`;
  const partnerUrlDesc = `partnerStatus=${form.partnerStatus}&searchType=${form.searchType}&searchKeyword=${form.searchKeyword}`;
  const appUrlDesc = `startDt=${form.startDt}&endDt=${form.endDt}&updateType=${form.updateType}
        &osType=${form.osType}&searchKeyword=${form.searchKeyword}`;
  let urlDesc;

  if (type === "push") urlDesc = pushUrlDesc;
  else if (type === "partner") urlDesc = partnerUrlDesc;
  else urlDesc = appUrlDesc;

  const config = {
    method: "get",
    url: `${process.env.DEV_API}/api/admin/${type}/list?&pageNum=${pageNum}&pageSize=10&${urlDesc}`,
    headers: {
      logintoken,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

// 푸시 등록, 파트너 등록, 앱 업데이트 버전 등록
const BoardsRegister = async (type, data) => {
  const config = {
    method: "post",
    url: `${process.env.DEV_API}/api/admin/${type}/register`,
    headers: {
      logintoken,
    },
    data,
  };
  const response = await axios(config);
  return response;
};

// 푸시 수정, 파트너 수정, 앱 업데이트 버전 수정
const BoardsUpdate = async (type, data, id) => {
  const config = {
    method: "put",
    url: `${process.env.DEV_API}/api/admin/${type}/${id}/update`,
    headers: {
      logintoken,
    },
    data,
  };
  await axios(config);
};

// 파트너 사업자등록번호 조회
const PartnerCheckNum = async num => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/api/admin/partner/check/corpnum?corpNum=${num}`,
    headers: {
      logintoken,
    },
  };
  const response = await axios(config);
  return response.data.data.partnerCheckCorpNum;
};

// 푸시 상세, 파트너 상세, 앱 업데이트 버전 상세
const BoardsDetails = async (type, id) => {
  const config = {
    method: "get",
    url: `${process.env.DEV_API}/api/admin/${type}/${id}/detail`,
    headers: {
      logintoken,
    },
  };
  const response = await axios(config);
  return response.data.data;
};

export default {
  BookList,
  NoticeFaqRegister,
  NoticeFaqUpdate,
  NoticeFaqSearch,
  NoticeFaqSubValue,
  NoticeFaqDetails,
  BoardsSearch,
  BoardsRegister,
  BoardsUpdate,
  PartnerCheckNum,
  BoardsDetails,
};
