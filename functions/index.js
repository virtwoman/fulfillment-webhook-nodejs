const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const productos = {
  ropero: { nombre: "Ropero", precio: 20,000, stock: true },
  cama: { nombre: "Cama", precio: 9,000, stock: true },
  chinero: { nombre: "Chinero", precio: 19,500, stock: false },
  // Agregá más productos aquí
};

app.post('/webhook', (req, res) => {
 /* const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(`¡Hola! Este es un webhook funcionando en Render 🎉`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);

  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
}); */
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
