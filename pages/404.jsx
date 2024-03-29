import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import SEO from "components/SEO";
import CommonImage from "components/CommonImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";

const Error404 = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <FlexRowCenter px={2} minHeight='100vh' flexDirection='column'>
      <SEO title='Nothing found' />
      <CommonImage
        src='/assets/images/illustrations/404.svg'
        sx={{
          display: "block",
          maxWidth: 320,
          width: "100%",
          mb: 3,
        }}
      />

      <FlexBox flexWrap='wrap'>
        <Button
          variant='outlined'
          color='primary'
          sx={{
            m: 1,
          }}
          onClick={handleGoBack}
        >
          돌아가기
        </Button>

        <Link href='/' passHref legacyBehavior>
          <Button
            variant='contained'
            color='primary'
            sx={{
              m: 1,
            }}
          >
            메인으로
          </Button>
        </Link>
      </FlexBox>
    </FlexRowCenter>
  );
};

export default Error404;
