import { Container, Grid } from "@mui/material";
import BookCard from "components/product-cards/BookCard";
import CategorySectionHeader from "components/CategorySectionHeader";
// ====================================================
const GridBookSection = ({ books, title }) => {
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <CategorySectionHeader title={title || "신규도서"} />

      <Grid container spacing={3}>
        {books && books.map(item => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={item.trade_uid}>
            <BookCard
              hoverEffect
              shop_name={item.shop_name}
              trade_uid={item.trade_uid}
              title={item.title}
              price={item.price}
              sell_price={item.sell_price}
              imgUrl={item.image || '/assets/images/default/no-image.gif'}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GridBookSection;
