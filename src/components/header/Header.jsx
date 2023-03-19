import Link from "next/link";
import { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Box, Button, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import Image from "components/CommonImage";
import { FlexBox } from "components/flex-box";
import MiniCart from "components/mini-cart/MiniCart";
import Category from "components/icons/Category";
import CategoryMenu from "components/categories/CategoryMenu";
import SearchBox from "components/search-box/SearchBox";
import Login from "pages-sections/sessions/Login";
import { layoutConstant } from "utils/constants";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ className }) => {
  const authContext = useContext(AuthContext);
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          minWidth='170px'
          alignItems='center'
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href='/'>
            <a>
              <h2 style={{ color: '#9d4100' }}>CUBCUB</h2>
              {/* <Image height={44} src='/assets/images/logo2.svg' alt='logo' /> */}
            </a>
          </Link>

          {/*navigations.js* 카테고리 목록*/}
          {/* {isFixed && (
            <CategoryMenu>
              <FlexBox color='grey.600' alignItems='center' ml={2}>
                <Button color='inherit'>
                  <Category fontSize='small' color='inherit' />
                  <KeyboardArrowDown fontSize='small' color='inherit' />
                </Button>
              </FlexBox>
            </CategoryMenu>
          )} */}
        </FlexBox>

        <FlexBox justifyContent='center' flex='1 1 0'>
          <SearchBox />
        </FlexBox>

        <FlexBox
          alignItems='center'
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {authContext.isLoggedIn ? (
            <>
              <Link href='/my'>
                <Button
                  size='small'
                  color='primary'
                  disableElevation
                  variant='contained'
                  className='button-link'
                  sx={{
                    height: 20,
                    borderRadius: "4px",
                  }}
                >
                  내정보
                </Button>
              </Link>

              <Link href='/my/create'>
                <Button
                  size='small'
                  color='primary'
                  disableElevation
                  variant='contained'
                  className='button-link'
                  sx={{
                    marginLeft: 1,
                    height: 20,
                    borderRadius: "4px",
                  }}
                >
                  내책판매
                </Button>
              </Link>
            </>
          ) : (
            <Link href='/login'>
              <Button
                size='small'
                color='primary'
                disableElevation
                variant='contained'
                className='button-link'
                sx={{
                  height: 20,
                  borderRadius: "4px",
                }}
              >
                로그인
              </Button>
            </Link>
          )}

        </FlexBox>

        <Dialog
          scroll='body'
          open={dialogOpen}
          fullWidth={isMobile}
          onClose={toggleDialog}
        >
          <Login />
        </Dialog>

        <Drawer open={sidenavOpen} anchor='right' onClose={toggleSidenav}>
          <MiniCart toggleSidenav={() => { }} />
        </Drawer>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
