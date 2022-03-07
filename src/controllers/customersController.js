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
  const cpf = req.query.cpf;

  try {
    if(req.query.cpf) {
      const { rows: customers } = await connection.query(`
      SELECT * FROM customers
        WHERE customers.cpf LIKE ($1)
        `, [`${cpf}%`]);
    
      res.send(customers);
    }else {
      const { rows: customers } = await connection.query(`
      SELECT * FROM customers`);
  
      res.send(customers);
    }

  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  let id = '';

  if(req.params.id) {
    id = `${req.params.id}`;
  }

  try {
    const {rows: listCustomers } = await connection.query(`
    SELECT customers.id FROM customers`);
    
    const searchCustomers = listCustomers.find((item) => item.id === parseInt(id))
    if(!searchCustomers) {

      res.status(404).send('Cliente não encontrado');
      return
    }

    const { rows: customers } = await connection.query(`
    SELECT * FROM customers
    WHERE customers.id=${id}`);

    res.send(customers);
  } catch(error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function updateCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  let id = '';

  if(req.params.id) {
    id = `${req.params.id}`;
  }

  try {
    // const {rows: listCustomers } = await connection.query(`
    // SELECT (cpf) FROM customers`);
    
    // const searchCustomers = listCustomers.find((item) => item.cpf === req.body.cpf)
    // if(searchCustomers) {

    //   res.status(409).send('Cliente já existente');
    //   return
    // }

    await connection.query(`
    UPDATE customers 
    SET (name, phone, cpf, birthday) = ($1, $2, $3, $4)
    WHERE customers.id=${id}
    `, [name, phone, cpf, birthday]);

    res.sendStatus(200)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
} 