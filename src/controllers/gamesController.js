import connection from "../database.js"

export async function setGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  
  try {
    await connection.query(`
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5)
      `, [name, image, stockTotal, categoryId, pricePerDay]);
      
      res.sendStatus(201);        
  } catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export async function getGames(req, res) {
  try {
    const { rows: games } = await connection.query(`
    SELECT games.*, categories.name as "categoryName", categories.name FROM games JOIN categories ON games."categoryId" = categories.id`);

    res.send(games);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
