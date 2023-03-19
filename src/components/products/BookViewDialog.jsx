import { Add, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { Place } from "@mui/icons-material";

import { FlexBox } from "components/flex-box";
import CommonImage from "components/CommonImage";
import CommonRating from "components/CommonRating";
import Carousel from "components/carousel/Carousel";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import Link from "next/link";

const ContentWrapper = styled(Box)(({ theme }) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1,
      left: 10,
    },
    "& .carousel__next-button": {
      opacity: 1,
      right: 10,
    },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": {
      color: theme.palette.grey[500],
    },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": {
    left: 0,
  },
  "& .carousel__next-button": {
    right: 0,
  },
})); // =====================================================

// =====================================================
const BookViewDialog = props => {
  const { product, openDialog, handleCloseDialog } = props;

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{
        zIndex: 1501,
      }}
    >
      <DialogContent
        sx={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel totalSlides={product.imgGroup.length} visibleSlides={1}>
                {product.imgGroup.map((item, index) => (
                  <CommonImage
                    key={index}
                    src={item}
                    sx={{
                      mx: "auto",
                      width: "100%",
                      objectFit: "contain",
                      height: {
                        sm: 400,
                        xs: 250,
                      },
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf='center'>
              <H2>{product.title}</H2>
              <Paragraph py={1} color='grey.500' fontWeight={600} fontSize={13}>
                <Place
                  fontSize='small'
                  sx={{
                    fontSize: 17,
                    mt: "3px",
                  }}
                />
                {product.shop_name}
              </Paragraph>
              <H1 color='primary.main'>
                {parseInt(product.sell_price).toLocaleString("ko-KR")}원
              </H1>
              <FlexBox alignItems='center' gap={1}>
                <CommonRating
                  color='warn'
                  fontSize='1.25rem'
                  value={4}
                  readOnly
                />
                <H6 lineHeight='1'>(50)</H6>
              </FlexBox>
              <Paragraph my={2}>{product.description}</Paragraph>

              <Divider
                sx={{
                  mb: 2,
                }}
              />
              <Link href={`/book/${product.trade_uid}`}>
                <a>
                  <Button
                    size='large'
                    color='primary'
                    variant='contained'
                    // onClick={handleCartAmountChange(1)}
                    sx={{
                      height: 45,
                    }}
                  >
                    상세보기
                  </Button>
                </a>
              </Link>
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
          onClick={handleCloseDialog}
        >
          <Close fontSize='small' color='secondary' />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default BookViewDialog;
