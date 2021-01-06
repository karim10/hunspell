import express from 'express';
import { nodehun } from './nodehun';
import { SpellRequest, Word } from './types';

const app = express();

app.get('/', (_req, res) => {
    return res.status(200).send('Hunspell');
});

// app.use(function (_req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json({ limit: '50mb' }));


app.post('/spellSync', (req: express.Request<SpellRequest>, res: express.Response) => {
    const { locale, words } = req.body as SpellRequest;
    const mispelledWords = words.filter(w => !nodehun.spellSync(w.str));
    return res.json(mispelledWords);
})

app.post('/spellAsync', async (req: express.Request<SpellRequest>, res: express.Response) => {
    const { locale, words } = req.body as SpellRequest;
    const mispelledWords: Word[] = [];
    words.forEach((w) => {
        if (!nodehun.spell(w.str)) {
            return mispelledWords.push(w);
        }
    })

    return res.json(mispelledWords);
})

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(`Hunspell server listetning on port ${port}`);
})