const connection = require("../database");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const productos = "SELECT * FROM productos";

  connection.query(productos, (err, results) => {
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
  const { nombre, codigo, costo, precio, stock, estado } = req.body;

  const producto = `INSERT INTO productos(nombre, codigo, costo, precio, stock, estado) VALUES ("${nombre}", "${codigo}", "${costo}", "${precio}", "${stock}", "${estado}");`;

  connection.query(producto, (err, results) => {
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
  const { nombre, codigo, costo, precio, stock, estado } = req.body;
  const { id } = req.params;
  console.log(id);

  const producto = `UPDATE productos SET 
    nombre = '${nombre}',
    codigo = '${codigo}',
    costo = '${costo}',
    precio = '${precio}',
    stock = '${stock}',
    estado = '${estado}',
    updated_at = CURRENT_TIMESTAMP()
  WHERE id = ${id};`;

  connection.query(producto, (err, results) => {
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

  const producto = `DELETE FROM productos WHERE id = ${id};`;

  connection.query(producto, (err, results) => {
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

  const producto = `UPDATE productos SET estado = !estado WHERE id = ${id};`;

  connection.query(producto, (err, results) => {
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

router.get("/activos/", (req, res) => {
  const productosActivos = `SELECT * FROM productos WHERE estado = 1 AND stock > 0;`;

  connection.query(productosActivos, (err, results) => {
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
        message: "Lista de productos activos",
      });
    }
  });
});

module.exports = router;
