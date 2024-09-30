const connection = require("../database");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const ventas = `SELECT v.id, CONCAT(c.nombre, ' ', c.apellido) AS cliente, p.nombre AS producto, v.cantidad, v.fecha FROM ventas v JOIN clientes c ON v.cliente_id = c.id JOIN productos p ON v.producto_id = p.id;`;

  connection.query(ventas, (err, results) => {
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
        message: "Lista de ventas",
      });
    }
  });
});

router.post("/", (req, res) => {
  const { producto_id, cliente_id, cantidad, fecha } = req.body;

  const venta = `INSERT INTO ventas(producto_id, cliente_id, cantidad, fecha) VALUES ("${producto_id}", "${cliente_id}", "${cantidad}", "${fecha}");`;

  connection.query(venta, (err, results) => {
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

module.exports = router;
