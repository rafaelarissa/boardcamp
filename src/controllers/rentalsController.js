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