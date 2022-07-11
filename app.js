require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const {
  PORT = 3000,
  MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb',
  FRONTEND_ADDRESS = 'https://fin.nomoredomains.xyz',
} = process.env;
const routes = require('./routes');
const errorHandler = require('./middlewares/errhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const corsOptions = {
  origin: FRONTEND_ADDRESS,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(requestLogger);
app.use(helmet());
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(MONGO_DB, { family: 4 })
  // { family: 4 } - forces mongoose to use IPv4 instead of IPv6
  .catch((err) => {
    console.log('Не удалось подключиться к базе данных. Ошибка: ', err);
  });

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порте ${PORT}`);
});
