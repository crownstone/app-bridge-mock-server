import {EventGenerator} from "./EventGenerator";
import {Request, Response} from "express-serve-static-core"
import {EventDispatcher} from "./EventDispatcher";
import {BridgeMock} from "./BridgeMock";
const cors = require('cors');

const express = require('express')
const app = express()
const port = 3100

app.use(cors()) // for parsing application/json
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let bridgeMock = new BridgeMock();

app.post('/reset', (req: Request, res : Response) => {
  let content = req.body;
  bridgeMock.reset();
  res.end()
})

app.post('/call', (req: Request, res : Response) => {
  let content = req.body;
  bridgeMock.addCall(content);
  res.end()
})

app.post('/success', (req: Request, res : Response) => {
  let content = req.body;
  bridgeMock.succeedCall(content);
  res.end()
})

app.post('/fail', (req: Request, res : Response) => {
  let content = req.body;
  bridgeMock.failCall(content);
  res.end()
})

app.post('/event', (req: Request, res : Response) => {
  let content = req.body;
  EventDispatcher.dispatch(EventGenerator.getNativeBusEvent(content.topic, content.data));
  res.end()
})

app.get('/calls', (req: Request, res : Response) => {
  let result = {
    pending: bridgeMock.pendingCalls,
    finished: bridgeMock.finishedCalls,
  };

  res.end(JSON.stringify(result))
})

app.use(express.static('public'))

app.get('/sse', async function(req: Request, res : Response) {
  // we only need to connect this incoming request to the legacy cloud. It will handle all the bookkeeping and the token validation.
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'X-Accel-Buffering': 'no'
  });

  res.write(EventGenerator.getStartEvent());

  EventDispatcher.addClient(req, res);
})


app.listen(port, () => {
  console.log(`Bluenet bridge mock server running on port ${port}`)
})