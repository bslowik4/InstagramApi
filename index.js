const http = require('http');

const imageRouter = require("./app/imageRouter");
const tagsRouter = require("./app/tagsRouter")
const filtersRouter = require("./app/filtersRouter")
const usersRouter = require("./app/userRouter")
const profileRouter = require("./app/profileRouter")

const logger = require("./app/logger")
require('dotenv').config();
const PORT = process.env.APP_PORT

http.createServer(async (req, res) => {
   const headers = {
      'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
      'Access-Control-Allow-Credentials': "true",
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Max-Age': 2592000, // 30 days
      'Access-Control-Allow-Headers': "*",
   };
   if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();
      return;
   }
   //images

   if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res)
   }

   //tags
   else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res)
   }

   else if (req.url.search("/api/filters") != -1) {
      await filtersRouter(req, res)
   }

   else if (req.url.search("/api/profile") != -1) {
      await profileRouter(req, res)
   }

   else if (req.url.search("/api/user") != -1) {
      await usersRouter(req, res)
   }

})
   .listen(PORT, () => console.log(`listen on ${process.env.APP_PORT}`))
