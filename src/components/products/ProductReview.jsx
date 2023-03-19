import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField, Rating } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductComment from "./ProductComment";
import { H2, H5 } from "components/Typography";
import api from "api/cubApi";

// ===================================================
const ProductReview = ({ data }) => {
  const router = useRouter();
  const [user_id, setUserId] = useState(null)
  useEffect(() => {
    setUserId(sessionStorage.getItem("user_uid"))
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    await api.NewReview(router.query.id, {
      book_uid: router.query.id,
      seller_uid: user_id,
      stars: values.rating,
      review: values.comment
    });
    resetForm();
  };

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });
  return (
    <Box>
      {data.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}
      {user_id && (
        <>
          <H2 fontWeight="600" mt={7} mb={2.5}>
            이 책에 대한 리뷰를 작성해주세요.
          </H2>

          <form onSubmit={handleSubmit}>
            <Box mb={2.5}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">별점</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <Rating
                color="warn"
                size="medium"
                value={values.rating}
                onChange={(_, value) => setFieldValue("rating", value)}
              />
            </Box>

            <Box mb={3}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">리뷰 작성</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <TextField
                rows={8}
                multiline
                fullWidth
                name="comment"
                variant="outlined"
                onBlur={handleBlur}
                value={values.comment}
                onChange={handleChange}
                placeholder="리뷰를 작성해주세요."
                error={!!touched.comment && !!errors.comment}
                helperText={touched.comment && errors.comment}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(dirty && isValid)}
            >
              등록
            </Button>
          </form>
        </>)}

    </Box>
  );
};

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "/assets/images/avatars/001-man.svg",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Joe Kenan",
    imgUrl: "/assets/images/avatars/001-man.svg",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "/assets/images/avatars/002-woman.svg",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
];
const initialValues = {
  rating: 0,
  comment: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  comment: yup.string().required("required"),
});
export default ProductReview;
