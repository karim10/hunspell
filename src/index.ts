import express from 'express';
const app = express();

app.get('/', (res, req) => {
    req.send("Hunspell");
})

const port = process.env.port || 4000; 

app.listen(port, () => {
    console.log('hello');
})