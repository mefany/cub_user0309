import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { H2 } from "components/Typography";
import { Container, Grid } from "@mui/material";
import DefaultLayout from "components/layouts/DefaultLayout";
import GridBookSection from "pages-sections/books/GridBookSection";
import ShopIntroCard from "components/shop/ShopIntroCard";
import api from "api/cubApi";

// ============================================================
const ShopDetails = () => {
  const router = useRouter();
  const [shop, setShop] = useState("");
  const [shopBooks, setShopBooks] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    getShopInfo(router.query.id);
    getShopBooks(router.query.id);
  }, [router]);

  const getShopInfo = async query => {
    const response = await api.ShopInfo(query);
    setShop(response);
  };

  const getShopBooks = async query => {
    const response = await api.BookListByShop(query);
    setShopBooks(response)
  };

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <DefaultLayout>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* SHOP INTRODUCTION AREA */}
        <ShopIntroCard
          name={shop.shop_name}
          phone={shop.phone1}
          address={shop.address_full}
          coverPicture={shop.shop_photo}
          profilePicture={shop.shop_photo}
        />

        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            {/* PRODUCT LIST AREA */}
            {shopBooks && shopBooks.length !== 0 ? (
              <GridBookSection books={shopBooks} title={"매장 보유 도서"} />
            ) : (<H2>매장에서 판매중인 책이 없습니다.</H2>)}
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};
export default ShopDetails;
