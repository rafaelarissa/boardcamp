import connection from "../database.js";

export async function setCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  
  try {
    const {rows: listCustomers } = await connection.query(`
    SELECT (cpf) FROM customers`);
    
    const searchCustomers = listCustomers.find((item) => item.cpf === req.body.cpf)
    if(searchCustomers) {

      res.status(409).send('Cliente já existente');
      return
    }

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

export async function getCustomerPerId(req, res) {
  let id = '';

  if(req.params.id) {
    id = `${req.params.id}`;
  }

  try {
    const { rows: customers } = await connection.query(`
    SELECT * FROM customers
    WHERE customers.id=${id}`);

    res.send(customers);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}