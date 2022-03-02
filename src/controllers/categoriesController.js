import connection from "../database.js";

export async function setCategories(req, res) {
  try {
    await connection.query(`
    INSERT INTO
      categories (name)
      VALUES ($1)
      `, [req.body.name]);

      res.sendStatus(201);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(`
    SELECT * FROM categories`);

    res.send(categories);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}