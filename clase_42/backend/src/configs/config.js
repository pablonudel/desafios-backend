import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const config = {
  MONGO_DB: {
    URL: process.env.MONGO_URL,
    DB_NAME: process.env.MONGO_DB,
  },
  SERVER: {
    PORT: process.env.PORT ?? DEV_PORT,
    ROUTES: {
      BASE: "/api",
      PRODUCTS: "/api/products",
      CARTS: "/api/cart",
      SESSIONS:"/api/sessions",
      USERS:"/api/users"
    },
    SESSION: {
      SECRET_KEY: process.env.SESSION_KEY ?? "key",
    },
    ADMIN:{
      USER: process.env.ADMIN_USER,
      PASSWORD: process.env.ADMIN_PASSWORD
    }
  },
  NODEMAILER:{
    EMAIL:process.env.NODEMAILER_EMAIL,
    PASSWORD: process.env.NODEMAILER_PASSWORD
  }
};

export { config };