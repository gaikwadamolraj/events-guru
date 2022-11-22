export const config = () => ({
  HTTP_PORT: Number(process.env.HTTP_PORT),
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL,
});
