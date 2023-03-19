import { useEffect, useState } from "react";
import api from "api/cubApi";
import SEO from "components/SEO";
import DefaultLayout from "components/layouts/DefaultLayout";
import CarouselBanner from "pages-sections/banner/CarouselBanner";
import PromotionBanner from "pages-sections/banner/PromotionBanner";
import GridBookSection from "pages-sections/books/GridBookSection";
import GridShopSection from "pages-sections/shops/GridShopSection";
// =================================================================
const IndexPage = () => {
  const mainCarouselData = [
    {
      title: "중고 책거래 플랫폼 CUBCUB 오픈!",
      imgUrl: "/assets/images/banners/main-banner.png",
      description: `우리동네 중고책 거래, 가까운 CUCUB 카페에서 만나보세요!`,
      buttonText: "보러가기",
      buttonLik: "#",
    },
    {
      title: "CUBCUB 사용 안내서!",
      imgUrl: "/assets/images/banners/main-banner.png",
      description: `CUBCUB 이용이 처음이시라면, 이용법을 확인해보세요!`,
      buttonText: "보러가기",
      buttonLik: "#",
    },
  ];
  const [books, setBook] = useState([]);
  const [stores, setStore] = useState([]);

  // 도서 리스트 조회 (최신순 정렬 1페이지 12개)
  const getBookList = (async () => {
    const response = await api.BookList("asc", 0, 12);
    setBook(response);
  });

  // 매장 리스트 조회 
  const getStoreList = (async () => {
    const response = await api.StoreList();
    setStore(response);
  });

  useEffect(() => {
    getBookList();
    getStoreList();
  }, []);


  return (
    <DefaultLayout>
      <SEO title='CUBCUB | 도서와 만나는 카페' />

      {/* main slide banner */}
      <CarouselBanner carouselData={mainCarouselData} />

      {/* newBooks */}
      <GridBookSection moreItems={books} />

      {/* StoreList */}
      <GridShopSection shops={stores} />

      {/* promotion banner */}
      {/* <PromotionBanner /> */}
    </DefaultLayout>
  );
};

export default IndexPage;
