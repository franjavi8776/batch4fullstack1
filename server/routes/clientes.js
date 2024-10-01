const connection = require("../database");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const clientes = "SELECT * FROM clientes";

  connection.query(clientes, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).json({
        data: results,
        message: "Lista de productos",
      });
    }
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { nombre, apellido, email, estado } = req.body;

  const cliente = `INSERT INTO clientes(nombre, apellido, email, estado) VALUES ("${nombre}", "${apellido}", "${email}", "${estado}");`;

  connection.query(cliente, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Registro exitoso",
      });
    }
  });
});

router.put("/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const { nombre, apellido, email, estado } = req.body;
  const { id } = req.params;
  //console.log(id);

  const cliente = `UPDATE clientes SET 
    nombre = '${nombre}',
    apellido = '${apellido}',
    email = '${email}',
    estado = '${estado}',
    updated_at = CURRENT_TIMESTAMP()
  WHERE id = ${id};`;

  connection.query(cliente, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Actualizacion exitosa",
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const cliente = `DELETE FROM clientes WHERE id = ${id};`;

  connection.query(cliente, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).send({
        message: "Borrado exitoso",
      });
    }
  });
});

router.patch("/estado/:id", (req, res) => {
  const { id } = req.params;

  const cliente = `UPDATE clientes SET estado = !estado WHERE id = ${id};`;

  connection.query(cliente, (err, results) => {
    if (err) {
      //console.log(err);
      res.status(500).send({
        error: err,
        message: "Error en la peticion",
      });
    } else {
      //console.log(result);
      res.status(200).json({
        data: results,
        message: "Actualizacion de estado exitoso",
      });
    }
  });
});

module.exports = router;
