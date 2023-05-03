/** Routes about cats. */

const express = require("express");
const router = new express.Router();
const db = require("../db")
const ExpressError = require("../expressError")
/** GET / - returns `{cats: [cat, ...]}` */

router.get("/", async function(req, res, next) {
  try {
    const catsQuery = await db.query("SELECT id, name FROM cats")
    return res.json({ cats: catsQuery.rows});
  } catch(err){
    return next(err)
  }
});


/** GET /[id] - return data about one cat: `{cat: cat}` */

router.get("/:id", async function(req, res, next) {
  try {
    const catQuery = await db.query(
      "SELECT id, name FROM cats WHERE id = $1", [req.params.id]);

    if (catQuery.rows.length === 0) {
      let notFoundError = new Error(`There is no cat with id '${req.params.id}`);
      notFoundError.status = 404;
      throw notFoundError;
    }
    return res.json({ cat: catQuery.rows[0] });
  } catch (err) {
    return next(err);
  }
});


/** POST / - create cat from data; return `{cat: cat}` */

router.post("/", async function(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO cats (name) 
         VALUES ($1) 
         RETURNING id, name`,
      [req.body.name,]);

    return res.status(201).json({cat: result.rows[0]});  // 201 CREATED
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[id] - update fields in cat; return `{cat: cat}` */

router.patch("/:id", async function(req, res, next) {
  try {
    if ("id" in req.body) {
      throw new ExpressError("Not allowed", 400)
    }

    const result = await db.query(
      `UPDATE cats 
           SET name=$1
           WHERE id = $2
           RETURNING id, name`,
      [req.body.name, req.params.id]);

    if (result.rows.length === 0) {
      throw new ExpressError(`There is no cat with id of '${req.params.id}`, 404);
    }

    return res.json({ cat: result.rows[0]});
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id] - delete cat, return `{message: "Cat deleted"}` */

router.delete("/:id", async function(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM cats WHERE id = $1 RETURNING id", [req.params.id]);

    if (result.rows.length === 0) {
      throw new ExpressError(`There is no cat with id of '${req.params.id}`, 404);
    }
    return res.json({ message: "Cat deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
