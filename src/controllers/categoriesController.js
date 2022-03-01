import connection from "../database";

export async function setCategories(req, res) {
  await connection.query(`
  INSERT INTO
    categories (name)
    VALUES
    `, [req.body]);

    res.sendStatus(201);
}