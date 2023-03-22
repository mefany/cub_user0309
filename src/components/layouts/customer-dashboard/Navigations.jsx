import { Fragment } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, styled, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink"; // custom styled components
import api from "api/cubApi";

const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const Navigations = () => {
  let user_id;
  const { pathname } = useRouter();
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    user_id = sessionStorage.getItem("user_uid");
    getUserBookInfo(15, 0);
  }, []);

  const getUserBookInfo = async (user_uid, start) => {
    const response = await api.UserBookInfo(user_uid, start);
    setBookCount(response.total);
  };

  return (
    <MainContainer>
      {linkList.map(item => (
        <Fragment key={item.title}>
          <Typography p='26px 30px 1rem' color='grey.600' fontSize='12px'>
            {item.title}
          </Typography>

          {item.list.map(item => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems='center' gap={1}>
                <item.icon
                  color='inherit'
                  fontSize='small'
                  className='nav-icon'
                />
                <span>{item.title}</span>
              </FlexBox>

              {item.title === "내책판매" && <span>{bookCount}</span>}
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

const linkList = [
  // {
  //   title: "책정보",
  //   list: [
  //     {
  //       href: "/my",
  //       title: "내책판매",
  //       icon: ShoppingBagOutlined,
  //       count: 5,
  //     },
  //     {
  //       href: "/wish-list",
  //       title: "찜한상품",
  //       icon: FavoriteBorder,
  //       count: 19,
  //     },
  //     // {
  //     //   href: "/support-tickets",
  //     //   title: "Support Tickets",
  //     //   icon: CustomerService,
  //     //   count: 1,
  //     // },
  //   ],
  // },
  {
    title: "내정보",
    list: [
      {
        href: "/my",
        title: "내책판매",
        icon: ShoppingBagOutlined,
        // count: 5,
      },
      {
        href: "/profile",
        title: "계정정보",
        icon: Person,
        // count: 3,
      },
      // {
      //   href: "/address",
      //   title: "단골매장",
      //   icon: Place,
      //   count: 16,
      // },
      // {
      //   href: "/payment-methods",
      //   title: "Payment Methods",
      //   icon: CreditCard,
      //   count: 4,
      // },
    ],
  },
];
export default Navigations;
