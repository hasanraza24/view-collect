This a simple user authentication test APIs.

1. create a database named "threadDB" using root user.
2. run commant "npm install" to install dependencies in project directory.
3. run "npm start".


To collect the unique view of the user you must authenticate an old user or register a new user.

APIs

1. Register a new user
  Method : POST,
  URL: /users/register
  Request Data: {
      email: "hasan@gmail.com",
      password: "12345"
  }

2. Login an old user
  Method : POST,
  URL: /users/login
  Request Data: {
      email: "hasan@gmail.com",
      password: "12345"
  }

  After login or register you will get a token user this token to store the unique user count.

  3. Collect view count
  Method: POST,
  URL: /view
  Request Data: {
      articleId: //someId,
      date: //date
  }
  pass token in Authorization header or in url query.

  4. Get view count for any article
  Method: GET,
  URL: /view/listForArticle
  Params: startDate, endDate

  5. Get view count for any user
  Method: GET,
  URL: /view/listForUser
  Params: startDate, endDate