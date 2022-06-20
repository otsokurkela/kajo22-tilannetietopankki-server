const express = require("express");
const router = express.Router();
const pool = require("./../db/db");

router.get("/", (request, response) => {
  response.send("Hello from tilannetiedot");
});

router.get("/tilannetiedot", async (request, response) => {
  try {
    const tilannetiedot = await pool.query("SELECT * FROM tilannetiedot");
    response.json(tilannetiedot.rows);
  } catch (error) {
    console.error(error);
  }
});

router.post("/tilannetiedot", async (request, response) => {
  try {
    console.log(request.body);
    const { tietoKuvaus } = request.body;
    const { tietoLahettaja } = request.body;
    const { tietoLabel } = request.body;

    const uusiTieto = await pool.query(
      "INSERT INTO tilannetiedot (kuvaus, lahettaja, label) VALUES ($1, $2, $3) RETURNING *",
      [tietoKuvaus, tietoLahettaja, tietoLabel]
    );

    response.json(uusiTieto.rows);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
