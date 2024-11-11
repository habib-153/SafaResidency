"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//const port = 3000
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const allowedOrigins = ['https://safaresidency.com', 'http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
// app.use(cors({ origin: ['*'], credentials: true}))
// app.use(cors({ origin: ['https://safaresidency.com', 'http://localhost:5173'], credentials: true}))
//  application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send("Hello from safa!!");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
