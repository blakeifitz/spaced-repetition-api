# Spaced repetition API

This app was created to demonstrate spaced repetition style learning. I chose French as an example.

The more often you get a word correct the less often the user will see it. The more often you get it incorrect the more you will see that word.

The the client app has a dashboard which displays the words, your guesses, and total correct. There is a learning page that will display the words and allow the user to guess.

| Method |        Path         |                                   Usage |
| :----- | :-----------------: | --------------------------------------: |
| POST   |      /api/user      |                       User registration |
| POST   |      /api/auth      | Manages authorization and authenication |
| GET    |    /api/language    |                           Get all words |
| GET    | /api/language/head  |                 Retreives users guesses |
| POST   | /api/language/guess |                   Submits users guesses |

### This app was created with:

<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img align="left" alt="NodeJS" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img align="left" alt="ExpressJS" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<img align="left" alt="Heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
