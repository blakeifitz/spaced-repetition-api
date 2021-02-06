const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const jsonBodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  try {
    const data = await LanguageService.getNext(req.app.get('db'), req.user.id);
    res.json({
      language: data.name,
      next: data.original,
      wordCorrectCount: data.correct_count,
      wordIncorrectCount: data.incorrect_count,
      totalScore: data.total_score,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.post('/guess', jsonBodyParser, async (req, res, next) => {
  const { guess } = req.body;
  let language = req.language;

  if (!guess) {
    return res.status(400).json({
      error: `Missing 'guess' in request body`,
    });
  }

  try {
    const words = await LanguageService.getWords(
      req.app.get('db'),
      language.id
    );

    const list = await LanguageService.createList(words);

    let isCorrect;
    let prevHead = list.head.value;
    let newNode = prevHead;

    if (newNode.translation === guess) {
      isCorrect = true;
      language.total_score++;
      newNode.correct_count++;

      let mem_val = newNode.memory_value * 2;
      newNode.memory_value = Math.min(mem_val, words.length);
    } else {
      isCorrect = false;
      newNode.incorrect_count++;
      newNode.memory_value = 1;
    }
    list.remove(prevHead);
    list.insertAt(newNode.memory_value, newNode);

    language.head = list.head.value.id;

    await LanguageService.updateDB(
      req.app.get('db'),
      language,
      list,
      req.user.id
    );

    let nextWord = await LanguageService.getNext(
      req.app.get('db'),
      req.user.id
    );

    let rep = {
      next: nextWord.original,
      totalScore: nextWord.total_score,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      answer: prevHead.translation,
      isCorrect,
    };

    res.json(rep);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = languageRouter;
