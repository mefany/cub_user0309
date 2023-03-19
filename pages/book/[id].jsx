import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import DefaultLayout from "components/layouts/DefaultLayout";
import BookIntro from "components/products/BookIntro";
import ProductReview from "components/products/ProductReview";
import AvailableShops from "components/products/AvailableShops";
import AvailableBooks from "components/products/AvailableBooks";
import ProductDescription from "components/products/ProductDescription";
import api from "api/cubApi";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
})); // ===============================================================

// ===============================================================
const ProductDetails = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value); // Show a loading state when the fallback is rendered
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [relatedBook, setRelatedBook] = useState(null);
  const [bookingUser, setBookingUser] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    getBookById(router.query.id);
    getBookingUser(router.query.id);
    getReviews(router.query.id);
  }, [router]);

  useEffect(() => {
    if (!book) return;
    getIsbnBooks(book.isbn);
  }, [book]);

  //선택한 도서 정보
  const getBookById = async (trade_uid) => {
    const response = await api.BookInfoByUid(trade_uid);
    setBook(response);
  };

  //선택한 도서 리뷰 정보
  const getReviews = async (trade_uid) => {
    const response = await api.ReviewList(trade_uid);
    console.log(response)
    setReviewCount(response.length)
    setReviews(response);
  };


  //동일한 isbn 판매상품 조회
  const getIsbnBooks = (async (isbn) => {
    const response = await api.IsbnBooks(isbn);
    setRelatedBook(response);
  });

  //예약자 정보 조회
  const getBookingUser = async trade_uid => {
    const response = await api.BookingUser(trade_uid);
    setBookingUser(response)
  };

  return (
    <DefaultLayout>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* BOOK DETAILS INFO AREA */}
        {book ? (
          <BookIntro data={book} bookingUser={bookingUser} />
        ) : (
          <H2>Loading...</H2>
        )}

        {/* BOOK DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor='primary'
          value={selectedOption}
          indicatorColor='primary'
          onChange={handleOptionClick}
        >
          <Tab className='inner-tab' label='상세' />
          <Tab className='inner-tab' label={`리뷰(${reviewCount})`} />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && book && (
            <ProductDescription data={book} />
          )}
          {selectedOption === 1 && reviews && (
            <ProductReview data={reviews} />
          )}
        </Box>

        {relatedBook && <AvailableBooks data={relatedBook} />}
        <AvailableShops />
      </Container>
    </DefaultLayout>
  );
};

export default ProductDetails;
