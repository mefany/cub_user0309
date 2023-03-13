import { useEffect, useState, useCallback } from "react";
import api from "api/BookApi";
import SEO from "components/SEO";
import DefaultLayout from "components/layouts/DefaultLayout";
import CarouselBanner from "pages-sections/banner/CarouselBanner";
import PromotionBanner from "pages-sections/banner/PromotionBanner";
import GridBookSection from "pages-sections/books/GridBookSection";
import GridShopSection from "pages-sections/shops/GridShopSection";
import axios from "axios";

// =================================================================
const IndexPage = props => {
  const mainCarouselData = [
    {
      title: "중고 책거래 플랫폼 CUBCUB 오픈!",
      imgUrl: "/assets/images/banners/main-banner.png",
      description: `우리동네 중고책 거래, 가까운 CUCUB 카페에서 만나보세요!`,
      buttonText: "보러가기",
      buttonLik: "#",
    },
    {
      title: "중고 책거래 플랫폼 CUBCUB 오픈!",
      imgUrl: "/assets/images/banners/main-banner.png",
      description: `우리동네 중고책 거래, 가까운 CUCUB 카페에서 만나보세요!`,
      buttonText: "보러가기",
      buttonLik: "#",
    },
  ];
  const [books, setBooks] = useState([]); // 전체 게시물 리스트

  // 도서 리스트 조회 API
  const getBookList = useCallback(async () => {
    const response = await api.BookList("asc");
    setBooks(response);
  });
  useEffect(() => {
    getBookList();
  }, []);

  return (
    <DefaultLayout>
      <SEO title='CUBCUB' />

      {/* main slide banner */}
      <CarouselBanner carouselData={mainCarouselData} />

      {/* newBooks */}
      <GridBookSection moreItems={books} />

      {/* Shops */}
      <GridShopSection shops={props.shops} />

      {/* promotion banner */}
      <PromotionBanner />
    </DefaultLayout>
  );
};

export const getStaticProps = async () => {
  // const res = await axios.get(
  //   "https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade?date_order=asc"
  // );
  // const books = await res.data;

  const res2 = await axios.get(
    "https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/shop"
  );
  const shops = await res2.data;

  return {
    props: {
      // books,
      shops,
    },
  };
};
export default IndexPage;
