import { Avatar, Box } from "@mui/material";
import { FlexBox } from "components/flex-box";
import CommonRating from "components/CommonRating";
import { H5, H6, Paragraph, Span } from "components/Typography";
import { getDateDifference } from "lib"; // ===========================================================

// ===========================================================
const ProductComment = props => {
  const { nickname, stars, created, review } = props;
  return (
    <Box mb={4} maxWidth='600px'>
      <FlexBox alignItems='center' mb={2}>
        <Avatar
          src='/assets/images/avatars/001-man.svg'
          sx={{
            width: 48,
            height: 48,
          }}
        />
        <Box ml={2}>
          <H5 mb={0.5}>{nickname}</H5>
          <FlexBox alignItems='center'>
            <CommonRating value={stars} color='warn' readOnly />
            <H6 mx={1.25}>{stars}</H6>
            <Span>{getDateDifference(created)}</Span>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color='grey.700'>{review}</Paragraph>
    </Box>
  );
};

export default ProductComment;
