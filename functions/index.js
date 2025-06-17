const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(`¡Hola! Este es un webhook funcionando en Render 🎉`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);

  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
