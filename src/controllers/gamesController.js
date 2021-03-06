import connection from "../database.js"

export async function setGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  
  try {
    const {rows: listCategories } = await connection.query(`
    SELECT (categories.id) FROM categories`);
    
    const searchCategories = listCategories.find(({id}) => id === categoryId )
    if(!searchCategories) {
      res.status(400).send('categoryId informado não corresponde a uma categoria existente');
      return
    }

    const {rows: listGames } = await connection.query(`
    SELECT games.name FROM games`);

    const searchGames = listGames.find((item) => item.name === req.body.name)
    if(searchGames) {

      res.status(409).send('Nome de jogo já existente');
      return
    }

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
  const name = req.query.name;
  
  try {
    if((req.query.name)){
      const { rows: games } = await connection.query(`
      SELECT games.*, categories.name as "categoryName", games.name FROM games JOIN categories ON games."categoryId"=categories.id
      WHERE LOWER(games.name) LIKE LOWER ($1)`, [`${name}%`]);   
      
      res.send(games);
    } else {
      const { rows: games } = await connection.query(`
      SELECT games.*, categories.name as "categoryName", games.name FROM games JOIN categories ON games."categoryId"=categories.id
      `);
      res.send(games);
    }
    
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
