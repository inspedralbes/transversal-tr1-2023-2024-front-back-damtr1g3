const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
let CryptoJS = require("crypto-js");
const https = require("https");
const fs = require("fs");
const path = require("path");
// const cookieParser = require("cook0ie-parser");
let history = require("connect-history-api-fallback");

const staticFieldMiddleware = express.static("public");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

const http = require("node:http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

const port = 3333;
server.listen(port, () => {
  //console.log(`listening at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  //console.log("a user connected");
  io.emit("connectat", "connectat");

  socket.on("Acceptada", (id) => {
    //Canviar estat a acceptat
    let sql = `UPDATE Pedido SET Estado = "En Preparacio" WHERE IDPedido = ${id}`;
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });

  socket.on("Rebutjada", (id) => {
    let sql = `UPDATE Pedido SET Estado = "Rebutjades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });

  socket.on("Llesta", (id) => {
    let sql = `UPDATE Pedido SET Estado = "Preparades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });

  socket.on("Entregada", (id) => {
    let sql = `UPDATE Pedido SET Estado = "Entregades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });

  socket.on("Habilitada", (id) => {
    let sql = `UPDATE Producto SET Habilitado = 0 WHERE IDProducto = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("ProductoNuevo");
  });

  socket.on("Deshabilitada", (id) => {
    let sql = `UPDATE Producto SET Habilitado = 1 WHERE IDProducto = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("ProductoNuevo");
  });

  socket.on("NuevoProducto", (producto) => {
    console.log(producto);
    let imagen = `http://damtr1g3.dam.inspedralbes.cat:3333/imagen/${producto.Imatge.replace(/ /g, "_")}.jpg`;
    let sql = `INSERT INTO Producto (NombreProducto,Descripcion,PrecioUnitario, Imatge, Categoria) VALUES ('${producto.name}','${producto.description}','${producto.price}','${imagen}','${producto.categoria}')`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      console.log(result);
    });
    io.emit("ProductoNuevo")
  });
  socket.on("EliminarProducto", (id) => {
    let sql = `DELETE FROM Producto WHERE IDProducto = ${id.id}`;
    conn.query(`SELECT NombreProducto FROM Producto WHERE IDProducto = ${id.id}`, function (err, result, fields) {
      if (err) throw err;
      try {
        fs.unlinkSync('./assets/' + "producto" + result[0].NombreProducto + '.jpg');
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
    });
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      console.log(result);
    });
    io.emit("ProductoNuevo");
  });

  socket.on("ActuProducto", (producto) => {
    console.log("HOLA");
    console.log(producto);
    let imagen = `http://damtr1g3.dam.inspedralbes.cat:3333/imagen/${producto.Imatge.replace(/ /g, "_")}.jpg`;
    let sql = `UPDATE Producto SET NombreProducto = '${producto.name}', Descripcion = '${producto.description}', PrecioUnitario = '${producto.price}', Imatge = '${imagen}' WHERE IDProducto = ${producto.id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("ProductoNuevo");
  });
  function LlamadaSocket() {
    io.emit("ProductoNuevo");
  }

  /*

  socket.on("Completada", (id) => {
    let sql = `UPDATE Pedido SET Estado = "Completada" WHERE IDPedido = ${id}`;
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
  });
*/
  socket.on("disconnect", () => {
    //console.log("user disconnected");
  });
});

const sessionsSecret = "2hCTcL2p5QMSny6DbZtUFjVtVXZqFa";
const sessionConfig = {
  secret: sessionsSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 600000,
  },
};

// app.use(cookieParser({}));
app.use(session(sessionConfig));

const mysql = require("mysql2");
const { error } = require("console");

let conn = mysql.createPool({
  host: "dam.inspedralbes.cat",
  user: "a22joaguesan_num3",
  password: "G3proyecto1",
  database: "a22joaguesan_tienda",
  connectionLimit: 20,
  queueLimit: 5,
  waitForConnections: true,
});

conn.getConnection((err, connection) => {
  if (err) {
    console.error(err);
  } else {
    //console.log("Connected to database!");/imagen
  }
});

function descargarImagen(url, carpetaDestino, nombreArchivo) {
  try {
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Error al descargar la imagen. Código de estado: ${response.statusCode}`
        );
        return;
      }

      const archivoDestino = `${carpetaDestino}/${nombreArchivo.replace(/ /g, "_")}`;
      const escrituraStream = fs.createWriteStream(archivoDestino);

      response.pipe(escrituraStream);

      escrituraStream.on("finish", () => {
        //console.log(`Imagen descargada y guardada en ${archivoDestino}`);
      });

      escrituraStream.on("error", (error) => {
        console.error(`Error al guardar la imagen: ${error}`);
      });
    });
  } catch (e) {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Error al descargar la imagen. Código de estado: ${response.statusCode}`
        );
        return;
      }

      const archivoDestino = `${carpetaDestino}/${nombreArchivo.replace(/ /g, "_")}`;
      const escrituraStream = fs.createWriteStream(archivoDestino);

      response.pipe(escrituraStream);

      escrituraStream.on("finish", () => {
        //console.log(`Imagen descargada y guardada en ${archivoDestino}`);
      });

      escrituraStream.on("error", (error) => {
        console.error(`Error al guardar la imagen: ${error}`);
      });
    });
  }

}

app.get("/imagen/:nombreArchivo", (req, res) => {
  const nombreArchivo = req.params.nombreArchivo;
  const rutaImagen = path.join(__dirname, "assets", nombreArchivo);
  res.sendFile(rutaImagen);
});

app.post("/imagen", (req, res) => {
  let url = req.body.url;
  descargarImagen(url, "./assets", req.body.nombre + ".jpg");
});

app.get("/getProducts", async (req, res) => {
  let sql = "SELECT * FROM Producto";

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    res.send(result);
  });
});

app.get("/getOneProduct/:id", async (req, res) => {
  let sql = `SELECT * FROM Producto WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(500).send("Product not found");
    }
  });
});

app.post("/addProduct", async (req, res) => {
  let imagen = `http://damtr1g3.dam.inspedralbes.cat:3333/imagen/${req.body.Imatge.replace(/ /g, "_")}.jpg`;
  let sql = `INSERT INTO Producto (NombreProducto,Descripcion,PrecioUnitario, Imatge) VALUES ('${req.body.name}','${req.body.description}','${req.body.price}','${imagen}')`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
    io.emit("ProductoNuevo");
  });
});
app.delete("/deleteProduct/:id", async (req, res) => {
  let sql = `DELETE FROM Producto WHERE IDProducto = ${req.params.id}`;
  conn.query(
    `SELECT NombreProducto FROM Producto WHERE IDProducto = ${req.params.id}`,
    function (err, result, fields) {
      if (err) throw err;
      try {
        fs.unlinkSync(
          "./assets/" + "producto" + result[0].NombreProducto + ".jpg"
        );
        //console.log("Delete File successfully.");
      } catch (error) {
        //console.log(error);
      }
      io.emit("ProductoNuevo");
    }
  );

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.put("/updateProduct/:id", async (req, res) => {
  let imagen = `http://damtr1g3.dam.inspedralbes.cat:3333/imagen/${req.body.Imatge.replace(/ /g, "_")}.jpg`;
  let sql = `UPDATE Producto SET NombreProducto = '${req.body.name}', Descripcion = '${req.body.description}', PrecioUnitario = '${req.body.price}', Imatge = '${imagen}' WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
  io.emit("ProductoNuevo");
});

app.put("/productStatus/:id", async (req, res) => {
  let sql = `UPDATE Producto SET Habilitado = ${req.body.status} WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/getOrders", async (req, res) => {
  let sql = `SELECT * FROM Pedido`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/getOrdersClient/:id", async (req, res) => {
  let sql = `SELECT * FROM Pedido WHERE IDCliente = '${req.params.id}' ORDER BY Estado`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/detailOrder/:id", async (req, res) => {
  let sql = `SELECT
  Pedido.IDPedido,
  Pedido.IDCliente,
  Producto.NombreProducto,
  Pedido.Comentario,
  Producto.PrecioUnitario,
  DetallePedido.Cantidad
FROM
  Producto
JOIN
  DetallePedido ON Producto.IDProducto = DetallePedido.IDProducto
JOIN
  Pedido ON DetallePedido.IDPedido = Pedido.IDPedido
  WHERE Pedido.IDPedido = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(500).send("Order not found");
    }
  });
});

app.post("/createOrder", async (req, res) => {
  // console.log(req.body.pedido.total);
  // console.log(req.body.productos[0].IDProducto)
  let sql = `INSERT INTO Pedido (IDCliente,Total,Comentario) VALUES ('${req.body.pedido.idClient}','${req.body.pedido.total}','${req.body.pedido.comentario}')`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    let sqlSelectLastOrder =
      "SELECT `IDPedido` FROM Pedido ORDER BY `FechaPedido` DESC LIMIT 1";

    conn.query(sqlSelectLastOrder, (err, result) => {
      if (err) console.error(err);
      let lastOrderId = result[0].IDPedido;

      for (const producto of req.body.productos) {
        let sqlInsertOrderProducts = `INSERT INTO DetallePedido (IDPedido,IDProducto,Cantidad) VALUES ('${lastOrderId}','${producto.IDProducto}','${producto.cantidad}')`;

        conn.query(sqlInsertOrderProducts, (err, result) => {
          if (err) console.error(err);
          //console.log(result);
        });
      }

      io.emit("comandaNova");
    });
  });
});

// app.post("/register", async (req, res) => {
//   let sql = `SELECT * FROM Cliente WHERE CorreoElectronico = '${req.body.email}'`;

//   conn.query(sql, (err, result) => {
//     if (err) console.error(err);
//     if (result.length > 0) {
//       res.status(500).send("User already exists");
//     } else {
//       let sql = `INSERT INTO Cliente (CorreoElectronico,Contrasena) VALUES ('${req.body.email}','${req.body.password}')`;

//       conn.query(sql, (err, result) => {
//         if (err) console.error(err);
//         //console.log(result);
//         res.send(result);
//       });
//     }
//   });
// });

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(500).send("Both email and password are required");
  } else {
    let sql = `SELECT * FROM Cliente WHERE CorreoElectronico = '${req.body.email}'`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      let ciphertext = CryptoJS.MD5(req.body.password).toString();
      if (result == 0 || result[0].Contrasena != ciphertext) {
        res.status(500).send("Wrong email or password");
      } else {
        req.session.user = result[0].CorreoElectronico;
        // res.cookie("user", req.session.user, { signed: true });
        res.send({ cookie: req.session, userData: result[0] });
      }
    });
  }
});

app.get("/mostrarGraficoHoras", (req, res) => {
  selectPedidos()
    .then(() => mostrarGraficaHoras())
    .then(() => {
      res.sendFile(__dirname + "/estadisticas.jpeg");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al generar la gráfica.");
    });
});

function selectPedidos() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Pedido";
    conn.query(sql, (err, result) => {
      if (err) {
        console.error("Error al cargar pregunta: ", err);
        cerrarServidor();
        reject(err);
      } else {
        const resultJson = JSON.stringify(result, null, 2);

        fs.writeFile("log.json", resultJson, (err) => {
          if (err) {
            console.error("error al escribir los resultados");
            reject(err);
          } else {
            //console.log("escrito con éxito");
            resolve();
          }
        });
      }
    });
  });
}
function selectProductosPedidos() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM DetallePedido";
    conn.query(sql, (err, result) => {
      if (err) {
        console.error("Error al cargar pregunta: ", err);
        reject(err);
      } else {
        const resultJson = JSON.stringify(result, null, 2);

        fs.writeFile("log2.json", resultJson, (err) => {
          if (err) {
            console.error("error al escribir los resultados");
            reject(err);
          } else {
            //console.log("escrito con éxito");
            resolve();
          }
        });
      }
    });
  });
}
function selectProductos() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Producto";
    conn.query(sql, (err, result) => {
      if (err) {
        console.error("Error al cargar pregunta: ", err);
        reject(err);
      } else {
        const resultJson = JSON.stringify(result, null, 2);

        fs.writeFile("productes.json", resultJson, (err) => {
          if (err) {
            console.error("error al escribir los resultados");
            reject(err);
          } else {
            //console.log("escrito con éxito");
            resolve();
          }
        });
      }
    });
  });
}

function mostrarGraficaHoras() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./graficos.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }
    });
  });
}
app.get("/mostrarGraficoEstados", async (req, res) => {
  try {
    await selectPedidos();
    await mostrarGraficaEstado();
    res.sendFile(__dirname + "/grafico2.jpeg");
  } catch (error) {
    console.error("Error al mostrar el gráfico de estados:", error);
    // Manejar el error, posiblemente enviar una respuesta de error al cliente
    res.status(500).send("Error al mostrar el gráfico de estados");
  }
});

app.get("/mostrarDatosProductos", async (req,res) => {
  try {
    await selectProductos();
    await selectProductosPedidos();
    await mostrarProductosPedidos();
    res.sendFile(__dirname + "/estadisticas_productos.jpeg");
  } catch (error) {
    console.error("Error al mostrar el gráfico de estados:", error);
    // Manejar el error, posiblemente enviar una respuesta de error al cliente
    res.status(500).send("Error al mostrar el gráfico de estados");
  }
})

function mostrarProductosPedidos() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./graficos4.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }
    });
  });
}


function mostrarGraficaEstado() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./grafico2.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }
    });
  });
}

app.get("/mostrarGraficoIngresos", async (req, res) => {
  try {
    await selectPedidos();
    await mostrarGraficaIngresos();
    res.sendFile(__dirname + "/estadisticas_ingresos.jpeg");
  } catch (error) {
    console.error("Error al mostrar el gráfico de ingresos:", error);
    res.status(500).send("Error al mostrar el gráfico de ingresos");
  }
});
app.get("/mostrarGraficoIngresosMensuales", async (req, res) => {
  try {
    await selectPedidos();
    await mostrarGraficaIngresosMensuales();
    res.sendFile(__dirname + "/estadisticas_mensuales.jpeg");
  } catch (error) {
    console.error("Error al mostrar el gráfico de ingresos:", error);
    res.status(500).send("Error al mostrar el gráfico de ingresos");
  }
});

app.get("/caixaDiaria", async (req, res) => {
  try {
    await selectPedidos();
    await calcularCaixaDiaria().then((value) => {resultat = value});
    JSON.parse(resultat)
    res.send(resultat)
  } catch (error) {
    console.error("Error al mostrar el gráfico de ingresos:", error);
    res.status(500).send("Error al mostrar el gráfico de ingresos");
  }
});


function calcularCaixaDiaria() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./graficos6.py"]);

    resultat = ""; 
    // Maneja la salida estándar de Python (stdout)
    proceso.stdout.on("data", (data) => {
      resultat = data.toString()
      //console.log(`Salida estándar de Python: ${data}`);
    });

    //console.log(resultat)

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve(resultat);
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }

    });
    
    // Maneja los errores estándar de Python (stderr)
    proceso.stderr.on("data", (data) => {
      console.error(`Errores estándar de Python: ${data}`);
    });
  });
}



function mostrarGraficaIngresosMensuales() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./graficos5.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }

    });

    // Maneja la salida estándar de Python (stdout)
    proceso.stdout.on("data", (data) => {
      console.log(`Salida estándar de Python: ${data}`);
    });

    // Maneja los errores estándar de Python (stderr)
    proceso.stderr.on("data", (data) => {
      console.error(`Errores estándar de Python: ${data}`);
    });
  });
}

function mostrarGraficaIngresos() {
  return new Promise((resolve, reject) => {
    let { spawn } = require("child_process");
    let proceso = spawn("python3", ["./graficos3.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
      }

    });

    // Maneja la salida estándar de Python (stdout)
    proceso.stdout.on("data", (data) => {
      console.log(`Salida estándar de Python: ${data}`);
    });

    // Maneja los errores estándar de Python (stderr)
    proceso.stderr.on("data", (data) => {
      console.error(`Errores estándar de Python: ${data}`);
    });
  });
}

app.get("/getClients", async (req, res) => {
  let sql = `SELECT * FROM Cliente`;
  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/gettemps", async (req, res) => {
  let sql = `SELECT * FROM Tiempo`;
  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(staticFieldMiddleware);
app.use(
  history({
    disableDotRules: true,
    verbose: true,
  })
);
app.use(staticFieldMiddleware);
