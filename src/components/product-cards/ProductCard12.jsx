import Link from "next/link";
import { Box } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import CommonImage from "components/CommonImage";
import CommonRating from "components/CommonRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import { calculateDiscount, currency } from "lib"; // ===========================================================

// ===========================================================
const ProductCard12 = ({
  id,
  slug,
  title,
  price,
  imgUrl,
  rating,
  off = 20,
  hideReview,
  hideFavoriteIcon,
}) => {
  return (
    <Box>
      <Link href={`/product/${slug}`}>
        <a>
          <HoverBox>
            <CommonImage
              src={imgUrl}
              width='100%'
              height='auto'
              alt={title}
              mx='auto'
            />
          </HoverBox>
        </a>
      </Link>

      <FlexBetween>
        <Box mt='1rem'>
          <H4 fontWeight='600' fontSize='14px' mb={0.5} title={title} ellipsis>
            {title}
          </H4>
          {!hideReview && <CommonRating value={rating} color='warn' readOnly />}

          <FlexBox alignItems='center'>
            <Box pr={1} fontWeight='600' color='primary.main'>
              {calculateDiscount(price, off)}
            </Box>

            {!!off && (
              <Box color='grey.600' fontWeight='600'>
                <del>{currency(price)}</del>
              </Box>
            )}
          </FlexBox>
        </Box>

        {!hideFavoriteIcon && (
          <FavoriteBorder
            fontSize='small'
            color='secondary'
            sx={{
              opacity: 0.5,
              m: "1rem",
            }}
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default ProductCard12;
