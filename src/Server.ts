import {EventGenerator} from "./EventGenerator";
import {Request, Response} from "express-serve-static-core"
import {EventDispatcher} from "./EventDispatcher";

const express = require('express')
const app = express()
const port = 3100

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/call', (req: Request, res : Response) => {
  let content = req.body;
  res.end()
})
app.post('/success', (req: Request, res : Response) => {
  let content = req.body;
  res.end()
})
app.post('/fail', (req: Request, res : Response) => {
  let content = req.body;
  res.end()
})
app.post('/event', (req: Request, res : Response) => {
  let content = req.body;
  res.end()
})


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