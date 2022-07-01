# Бекэнд REST API для Дипломной работы
**Создано в рамках прохождения курса "Веб-разработчик" в [Яндекс.Практикум](https://practicum.yandex.ru/).**

## **Описание:**

REST API для Дипломной работы, связанное с базой данных MongoDB. При запуске приложение подключается к серверу mongo по адресу: `mongodb://localhost:27017/bitfilmsdb`.

## Домен API:
### [link placeholder](https://foolink)

## **Функционал:**

### **Роуты авторизации пользователей:**
`POST /signup` - создает пользователя с переданными в теле запроса;
`POST /signin` - авторизирует пользователя с переданными в теле запроса;

### **Роуты для пользователей:**
`GET /users/me` - возвращает данные авторизованного пользователя;
`PATCH /users/me` - редактирует свои данные;

### **Роуты для карточек:**
`GET /movies` - возвращает все сохранённые пользователем фильмы;
`POST /movies` - создаёт фильм с переданными в теле запроса _id;
`DELETE /movies/:movieId` - удаляет сохранённый фильм по _id;

## **Технологии:**
-   Express.js for Node.js
-   API REST
-   MongoDB + mongoose

## **Инструкция по установке:**

Клонировать репозиторий:
`git clone https://github.com/max-ermilov/movies-explorer-api.git`

В директории проекта запустить приложение:

`npm install`		- устанавливает зависимости;
`npm run dev` 		- запускает сервер в режиме разработки с hot-reload через nodemon;
`npm run start` 	- запускает сервер через node;

## **Работа выполнена по чек-листу:**

[Чек-лист](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)
