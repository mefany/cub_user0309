import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { Container, Grid, IconButton, useMediaQuery } from "@mui/material";
import FilterList from "@mui/icons-material/FilterList";
import DefaultLayout from "components/layouts/DefaultLayout";
import GridBookSection from "pages-sections/books/GridBookSection";

import ProductCardList from "components/products/ProductCard1List";
import ProductFilterCard from "components/products/ProductFilterCard";
import ShopIntroCard from "components/shop/ShopIntroCard";
import axios from "axios";
import Sidenav from "components/sidenav/Sidenav";

// ============================================================
const ShopDetails = () => {
  const router = useRouter();
  const [shop, setShop] = useState("");
  const [shopBooks, setShopBooks] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    getShopInfo(router.query.id);
    getShopBooks(router.query.id);
  }, [router]);

  const getShopInfo = useCallback(async query => {
    const res = await axios.get(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/shop/${query}`
    );
    setShop(res.data[0]);
  });

  const getShopBooks = useCallback(async query => {
    const res = await axios.get(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade?shop=${query}`
    );
    if (res.status === 200) {
      setShopBooks(res.data);
    }
  });

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const ICON_BUTTON = (
    <IconButton
      sx={{
        float: "right",
      }}
    >
      <FilterList fontSize='small' />
    </IconButton>
  );
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
            {shopBooks && (
              <GridBookSection moreItems={shopBooks} title={"매장 보유 도서"} />
            )}
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
};
export default ShopDetails;
