import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";
const CommonRating = styled(Rating)(compose(spacing, typography));
CommonRating.defaultProps = {
  fontSize: "1.25rem",
};
export default CommonRating;
