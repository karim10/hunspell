import express from 'express';
import { nodehun } from './nodehun';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).send('Hunspell');
});

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log('hello');
})