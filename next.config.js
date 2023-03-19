module.exports = {
  reactStrictMode: true,
  env: {
    DEV_API: "https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com",
  },
  images: {
    domains: ["image.yes24.com", "wimg.mk.co.kr", "shopping-phinf.pstatic.net"],
  },
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "USD",
  },
};
