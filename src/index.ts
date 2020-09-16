import express from 'express';

import { nodehun } from './hunspell';
import { SpellRequest } from './types';




const app = express();
const port = 4000;

app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.post('/spell', (req: express.Request<SpellRequest>, res: express.Response) => {
    const { locale, words } = req.body as SpellRequest;
    const mispelledWords = words.filter(w => !nodehun.spellSync(w.str));
    return res.json(mispelledWords);
})

app.listen(port, () => {
    console.log(`Server listening to ${port} port.`)
})




