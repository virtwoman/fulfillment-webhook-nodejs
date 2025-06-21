const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.json());
// Productos disponibles
const productos = {
  ropero: { nombre: "Ropero", precio: C$20,000, stock: true },
  cama_matrimonial: { nombre: "Cama Matrimonial", precio: C$9,000, stock: true },
  cama_unipersonal: { nombre: "Cama Unipersonal", precio: C$6,900, stock: true }
  chinero: { nombre: "Chinero", precio: C$19,500, stock: true },
  juegosala: { nombre: "Juego de Sala", precio: C$17,500, stock: true },
  centrotv: { nombre: "Mueble de TV", precio: C$25,000, stock: true },
};

app.post("/webhook", (req, res) => {
  const tipo = req.body.queryResult.parameters.tipoMueble?.toLowerCase();

  if (!tipo || !productos[tipo]) {
    return res.json({
      fulfillmentText: "Lo siento, no tengo información sobre ese producto."
    });
  }

  const prod = productos[tipo];
  const texto = `${prod.nombre} - C$${prod.precio.toLocaleString()}
${prod.stock ? "Disponible en stock." : "No disponible actualmente."} ¿Qué deseas hacer?`;

  return res.json({
    fulfillmentMessages: [
      {
        platform: "facebook",
        quickReplies: {
          title: texto,
          quickReplies: [
            {
              content_type: "text",
              title: "Reservar",
              payload: `RESERVAR_${prod.nombre.toUpperCase()}`
            },
            {
              content_type: "text",
              title: "Consultar otro producto",
              payload: "CONSULTAR_OTRO"
            }
          ]
        }
      }
    ]
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor webhook activo en puerto ${PORT}`);
});
