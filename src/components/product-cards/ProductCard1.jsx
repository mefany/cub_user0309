import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LazyImage from "components/LazyImage";
import CommonCard from "components/CommonCard";
import { H3, Span } from "components/Typography";
import CommonRating from "components/CommonRating";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { calculateDiscount, currency } from "lib"; // styled components

const StyledCommonCard = styled(CommonCard)(() => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const HoverIconWrapper = styled(Box)(() => ({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
})); // ========================================================

// ========================================================
const ProductCard1 = ({
  trade_uid,
  title,
  sell_price,
  imgUrl,
  shop_name,
  // rating = 5,
  hideRating,
  hoverEffect,
  discount = 5,
  showProductSize,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite(fav => !fav);
  const toggleDialog = useCallback(() => setOpenModal(open => !open), []);

  return (
    <StyledCommonCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {!!discount && (
          <StyledChip color='primary' size='small' label={`${discount}% off`} />
        )}

        <HoverIconWrapper className='hover-box'>
          <IconButton onClick={toggleDialog}>
            <RemoveRedEye color='disabled' fontSize='small' />
          </IconButton>

          <IconButton onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color='primary' fontSize='small' />
            ) : (
              <FavoriteBorder fontSize='small' color='disabled' />
            )}
          </IconButton>
        </HoverIconWrapper>

        <Link href={`/book/${trade_uid}`}>
          <a>
            {imgUrl && (
              <LazyImage
                src={imgUrl}
                width={0}
                height={0}
                layout='responsive'
                alt={title}
              />
            )}
          </a>
        </Link>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          title,
          sell_price,
          trade_uid,
          imgGroup: [imgUrl, imgUrl],
        }}
      />

      <ContentWrapper>
        <FlexBox>
          <Box flex='1 1 0' minWidth='0px' mr={1}>
            <Link href={`/book/${trade_uid}`}>
              <a>
                <H3
                  mb={1}
                  title={title}
                  fontSize='14px'
                  fontWeight='600'
                  className='title'
                  color='text.secondary'
                >
                  {title}
                </H3>
                <H3
                  mb={1}
                  title={shop_name}
                  fontSize='14px'
                  fontWeight='600'
                  className='shop_name'
                  color='grey.600'
                >
                  {shop_name}
                </H3>
              </a>
            </Link>

            {/* {!hideRating && (
              <CommonRating value={rating || 0} color="warn" readOnly />
            )} */}

            {showProductSize && (
              <Span color='grey.600' mb={1} display='block'>
                {showProductSize}
              </Span>
            )}

            <FlexBox alignItems='center' gap={1} mt={0.5}>
              <Box fontWeight='600' color='primary.main'>
                {sell_price}원
              </Box>
            </FlexBox>
          </Box>
        </FlexBox>
      </ContentWrapper>
    </StyledCommonCard>
  );
};

export default ProductCard1;
