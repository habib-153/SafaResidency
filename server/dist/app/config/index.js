"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
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
    sender_email: process.env.SENDER_EMAIL,
    sender_app_password: process.env.SENDER_APP_PASS
};
