const Router = require("express").Router;
const router = new Router();

const Game = require("../models/game");
const {ensureLoggedIn} = require("../middleware/auth");
const ExpressError = require("../expressError");

/** get detail of game.
 *
 * => {game: {id, username, p1score, p2score, p3score, p4score, played_at}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    let username = req.user.username;
    let game = await Game.get(req.params.id);

    if (game.username !== username) {
      throw new ExpressError("Cannot read this game", 401);
    }

    return res.json({game});
  }

  catch (err) {
    return next(err);
  }
});


/** post game.
 *
 * {to_username, body} =>
 *   {game: {id, from_username, to_username, body, sent_at}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    let msg = await Game.create({
      from_username: req.user.username,
      to_username: req.body.to_username,
      body: req.body.body
    });

    return res.json({game: msg});
  }

  catch (err) {
    return next(err);
  }
});


/** mark game as read:
 *
 *  => {game: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
  try {
    let username = req.user.username;
    let msg = await Game.get(req.params.id);

    if (msg.to_user.username !== username) {
      throw new ExpressError("Cannot set this game to read", 401);
    }
    let game = await Game.markRead(req.params.id);

    return res.json({game});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;