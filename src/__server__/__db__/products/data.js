import products from "data/product-database";
import { products as gadget } from "../gadget/data";
import { products as market1 } from "../market-1/data";
import {
  relatedProducts,
  frequentlyBoughtData,
} from "../related-products/data";
const dbProducts = [...products]; // all used products in the bazaar template

const productList = [
  ...dbProducts,
  ...gadget,
  ...market1,
  ...relatedProducts,
  ...frequentlyBoughtData,
]; // get unique products from prouct list

const uniqueProudcts = [...new Set(productList.map(item => item.slug))].map(
  item => productList.find(it => it.slug === item)
); // get the all slugs

const slugs = uniqueProudcts.map(item => ({
  params: {
    slug: item.slug,
  },
}));
export { uniqueProudcts, slugs };
