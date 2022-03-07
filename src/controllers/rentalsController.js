import dayjs from "dayjs";
import connection from "../database.js";

export async function setRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  
  try {
    const { rows: pricePerDay } = await connection.query(`
    SELECT games."pricePerDay"
    FROM games 
    WHERE games.id=${gameId}`)

    const gamePrice = pricePerDay.map((a) => a.pricePerDay)
    
    await connection.query(`
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, null, daysRented*gamePrice, null]);

    res.sendStatus(201)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500) 
  }
}

export async function getRentals(req, res) {
  
  try {
    const result = await connection.query({
      text: `
        SELECT
          rentals.*,
          customers.id as "customersId", customers.name as "customersName",
          games.id as "gameId", games.name as "gamesName", games."categoryId",
          categories.name as "categoryName"
        FROM rentals
          JOIN customers ON customers.id=rentals."customerId"
          JOIN games ON games.id=rentals."gameId"
          JOIN categories ON categories.id=games."categoryId"
      `,
      rowMode: 'array'
    });
    res.send(result.rows.map(row => {
      const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, 
        customersId, customersName, 
        gamesId, gamesName, categoryId, categoryName] = row;

      return {
        id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, 
        customer: { id: customersId, name: customersName },
        game: { id: gameId, name: gamesName, categoryId, categoryName}
      }
    }))
  } catch(error) {
    console.log(error.message)
    res.sendStatus(500) 
  }
}