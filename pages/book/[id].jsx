import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import DefaultLayout from "components/layouts/DefaultLayout";
import BookIntro from "components/products/BookIntro";
import ProductReview from "components/products/ProductReview";
import AvailableShops from "components/products/AvailableShops";
import RelatedProducts from "components/products/RelatedProducts";
import AvailableBooks from "components/products/AvailableBooks";
import ProductDescription from "components/products/ProductDescription";
import axios from "axios";

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

const bookingUser = [];
// ===============================================================
const ProductDetails = props => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value); // Show a loading state when the fallback is rendered
  const [book, setBook] = useState(null);
  const [relatedBook, setRelatedBook] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const [bookingUser, setBookingUser] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    getBookById(router.query.id);
    getBookingUser(router.query.id);
  }, [router]);

  const getIsbnBooks = async isbn => {
    console.log("get", isbn);
    const res = await axios.get(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade?isbn=${isbn}`
    );
    const books = await res.data;
    console.log(books);
    setRelatedBook(books);
    setLoading(false);
  };

  const getBookById = async trade_uid => {
    const res = await axios.get(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade/${trade_uid}`
    );
    const book = await res.data[0];
    setBook(book);
    getIsbnBooks(book.isbn);
  };

  const getBookingUser = async trade_uid => {
    const res = await axios.get(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/booking/${trade_uid}`
    );
    const users = await res.data;
    if (users.length > 0) {
      bookingUser = users;
    }
    console.log("getBookingUser", bookingUser);
  };

  return (
    <DefaultLayout>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {book ? (
          <BookIntro data={book} bookingUser={bookingUser} />
        ) : (
          <H2>Loading...</H2>
        )}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor='primary'
          value={selectedOption}
          indicatorColor='primary'
          onChange={handleOptionClick}
        >
          <Tab className='inner-tab' label='상세' />
          <Tab className='inner-tab' label='리뷰 (3)' />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && book ? (
            <ProductDescription data={book} />
          ) : (
            <H2>Loading...</H2>
          )}
          {selectedOption === 1 && <ProductReview />}
        </Box>

        <AvailableBooks data={relatedBook} />
        <AvailableShops />
      </Container>
    </DefaultLayout>
  );
};

export default ProductDetails;
