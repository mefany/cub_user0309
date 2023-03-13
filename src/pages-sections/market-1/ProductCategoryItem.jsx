import { styled } from "@mui/material";
import CommonCard from "components/CommonCard";
import LazyImage from "components/LazyImage";
import { H4 } from "components/Typography"; // styled component

const StyledCommonCard = styled(CommonCard)(({ theme }) => ({
  gap: "1rem",
  display: "flex",
  borderRadius: 5,
  cursor: "pointer",
  alignItems: "center",
  padding: "0.75rem 1rem",
  "&:hover": {
    boxShadow: theme.shadows[2],
  },
})); // ==============================================================================

// ==============================================================================
const ProductCategoryItem = ({
  title,
  imgUrl,
  isSelected,
  sx = {},
  ...others
}) => {
  return (
    <StyledCommonCard
      elevation={isSelected ? 2 : 0}
      sx={{
        bgcolor: isSelected ? "white" : "grey.100",
        ...sx,
      }}
      {...others}
    >
      {imgUrl && (
        <LazyImage
          width={20}
          height={20}
          layout='fixed'
          objectFit='cover'
          src={imgUrl}
          alt=''
        />
      )}
      <H4 lineHeight='1' textTransform='capitalize'>
        {title}
      </H4>
    </StyledCommonCard>
  );
};

export default ProductCategoryItem;
