import connection from "../database.js";

export async function setCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(`
    INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4)
    `, [name, phone, cpf, birthday]);

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export async function getCustomers(req, res) {
  try {
    const { rows: customers } = await connection.query(`
    SELECT * FROM customers`);

    res.send(customers);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}