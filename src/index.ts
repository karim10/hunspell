import express from 'express';
import { nodehun } from './nodehun';

const app = express();

app.get('/', (res, req) => {
    const result = nodehun.spellSync('hello');
    req.send(`result for hello: ${result}`);
})

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log('hello');
})