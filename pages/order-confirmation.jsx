import Link from "next/link";
import { Button, Container, styled } from "@mui/material";
import SEO from "components/SEO";
import LazyImage from "components/LazyImage";
import CommonCard from "components/CommonCard";
import { H1, Paragraph } from "components/Typography";
import DefaultLayout from "components/layouts/DefaultLayout"; // custom styled components

const Wrapper = styled(CommonCard)(() => ({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
}));
const StyledButton = styled(Button)(() => ({
  marginTop: "2rem",
  padding: "11px 24px",
}));

const OrderConfirmation = () => {
  return (
    <DefaultLayout>
      <SEO title='Order Confirmation' />

      <Container
        sx={{
          mt: 4,
          mb: 20,
        }}
      >
        <Wrapper>
          <LazyImage
            width={116}
            height={116}
            alt='complete'
            src='/assets/images/illustrations/party-popper.svg'
          />
          <H1 lineHeight={1.1} mt='1.5rem'>
            Your order is completed!
          </H1>

          <Paragraph color='grey.800' mt='0.3rem'>
            You will be receiving confirmation email with order details.
          </Paragraph>

          <Link href='/home-1' passHref>
            <StyledButton
              color='primary'
              disableElevation
              variant='contained'
              className='button-link'
            >
              Browse products
            </StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </DefaultLayout>
  );
};

export default OrderConfirmation;
