import { useState, useEffect } from "react";
import { Box, Card, Container, Grid, MenuItem, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import DefaultLayout from "components/layouts/DefaultLayout";
import { useRouter } from "next/router";
import api from "api/cubApi";
import BookCard from "components/product-cards/BookCard";

const ProductSearchResult = () => {
  const router = useRouter();
  const [resultList, setResultList] = useState([]);
  const title = router.query.title;
  const [query, setQuery] = useState(router.query.title + "&price_order=asc");

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    getSearchBooks(router.query.title);
  }, [router]);

  useEffect(() => {
    getSearchBooks(query);
  }, [query]);

  const getSearchBooks = async query => {
    const response = await api.SearchBook(query);
    setResultList(response);
  };

  const handleOnChange = e => {
    if (e.target.value !== "latest") {
      setQuery(title + "&price_order=" + e.target.value);
    } else {
      setQuery(title + "&date_order=asc");
    }
    getSearchBooks(query);
  };

  return (
    <DefaultLayout>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {/* TOP BAR AREA */}
        <Card
          elevation={1}
          sx={{
            mb: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            <H5>검색어 “{title}”(으)로 찾은 결과입니다.</H5>
            <Paragraph color='grey.600'>
              총 {resultList.length}개의 검색 결과
            </Paragraph>
          </Box>

          <FlexBox
            alignItems='center'
            columnGap={4}
            flexWrap='wrap'
            my='0.5rem'
          >
            <FlexBox alignItems='center' gap={1} flex='1 1 0'>
              <Paragraph color='grey.600' whiteSpace='pre'>
                정렬 기준:
              </Paragraph>

              <TextField
                select
                fullWidth
                size='small'
                variant='outlined'
                placeholder='Short by'
                defaultValue={sortOptions[0].value}
                onChange={handleOnChange}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map(item => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>
          </FlexBox>
        </Card>

        {/* PRODUCT VIEW AREA */}
        <Grid container spacing={3}>
          {resultList ? (
            resultList.map((item, ind) => (
              <Grid item lg={2} md={2} sm={6} xs={6} key={ind}>
                <BookCard
                  hoverEffect
                  shop_name={item.shop_name}
                  trade_uid={item.trade_uid}
                  title={item.title}
                  price={item.sell_price}
                  sell_price={item.sell_price}
                  imgUrl={item.image}
                  discount={item.discount}
                />
              </Grid>
            ))
          ) : (
            <H2>Loading...</H2>
          )}
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

const sortOptions = [
  {
    label: "낮은가격순",
    value: "asc",
  },
  {
    label: "높은가격순",
    value: "desc",
  },
  {
    label: "최신순",
    value: "latest",
  },
];
export default ProductSearchResult;
