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
  bridgeMock.reset();
  console.log("Called /reset")
  res.end()
})


app.post('/callPromise', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /callPromise")
  bridgeMock.addCall(content);
  res.end()
})


app.post('/callBluenet', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /callBluenet");
  bridgeMock.addBluenetCall(content);
  res.end()
})


app.post('/success', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /success")
  bridgeMock.succeedCall(content);
  res.end()
})


app.post('/successById', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /successById")
  bridgeMock.succeedById(content.id, content.result, false);
  res.end()
})


app.post('/fail', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /fail")
  bridgeMock.failCall(content);
  res.end()
})


app.post('/event', (req: Request, res : Response) => {
  let content = req.body;
  console.log("Called /event")
  EventDispatcher.dispatch(EventGenerator.getNativeBusEvent(content.topic, content.data));
  res.end()
})


app.get('/functionCalls', (req: Request, res : Response) => {
  let content = req.query;
  console.log("Called /functionCalls", content)
  // @ts-ignore
  let result = bridgeMock.getFunctionCalls(content.function)

  res.end(JSON.stringify(result))
})


app.get('/notification', (req: Request, res : Response) => {
  let content = req.query;
  console.log("Called /functionCalls", content)
  EventDispatcher.dispatch(EventGenerator.getNotificationEvent(content.data));
  res.end();
})


app.get('/calls', (req: Request, res : Response) => {
  console.log("Called /calls")
  let result = {
    pending:  bridgeMock.pendingCalls,
    finished: bridgeMock.finishedCalls,
    bluenet:  bridgeMock.bluenetCalls,
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