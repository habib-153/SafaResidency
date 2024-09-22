import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.ACCESS_TOKEN_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRE,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  sslcommerz_init_payment_url: process.env.SSL_PAYMENT_URL,
  sslcommerz_validation_url: process.env.SSL_PAYMENT_VALIDATION_URL,
};
