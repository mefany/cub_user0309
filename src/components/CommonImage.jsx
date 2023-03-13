import { compose, display, spacing, styled } from "@mui/system";
const CommonImage = styled("img")(compose(spacing, display));
CommonImage.defaultProps = {
  display: "block",
};
export default CommonImage;
