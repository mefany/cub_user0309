import { Box, Grid } from "@mui/material";
import { H3 } from "components/Typography";
import ShopCard1 from "components/shop/ShopCard1";
// ====================================================
const AvailableShops = ({ data }) => {
  return (
    <Box mb={7.5}>
      {data.length !== 0 && <H3 mb={3}>도서 보유 매장</H3>}
      {/* ALL SHOP LIST AREA */}
      <Grid container spacing={3}>

        {data.map((item) => (
          <Grid item lg={3} sm={6} xs={12} key={item.shop_uid}>
            <ShopCard1
              name={item.shop_name}
              shop_uid={item.shop_uid}
              // slug={item.slug}
              phone={item.phone1}
              address={item.address_full}
              // rating={item.rating || 5}
              coverPicture={item.shop_photo}
              profilePicture={item.shop_photo}
            />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};
export default AvailableShops;
