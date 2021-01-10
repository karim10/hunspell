import express from 'express';
import { nodehun } from './nodehun';
import { SpellRequest, Word } from './types';

const fs = require('fs');

const app = express();

// only for local development
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cache-Control', 'public')
    next();
});

app.use(express.json({ limit: '50mb' }));

app.get('/', (_req, res) => {
    return res.status(200).send('Hunspell');
});

app.post('/spellSync', (req: express.Request<SpellRequest>, res: express.Response) => {
    const { locale, words } = req.body as SpellRequest;
    const mispelledWords = words.filter(w => !nodehun.spellSync(w));
    return res.json(mispelledWords);
})

app.get('/suggestAsync/:locale/:word', async (req, res) => {
    console.log('suggest async');
    const { locale, word } = req.params;
    const suggestionResult = await nodehun.suggest(word);
    return res.json(suggestionResult || []);
})

app.post('/spellAsync', async (req: express.Request<SpellRequest>, res: express.Response) => {
    // Write body to json file
    // fs.writeFile('body.json', JSON.stringify(req.body), () => {
    //     console.log('done!');
    // });

    const { locale, words } = req.body as SpellRequest;
    const mispelledWords: string[] = [];

    console.time('api time');
    for (let i = 0; i < words.length; i++) {
        const spellResult = await nodehun.suggest(words[i]);
        if (spellResult && spellResult.length > 0) {
            mispelledWords.push(words[i]);
        }
    }
    console.timeEnd('api time');

    return res.json(mispelledWords);
})

const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(nodehun.spellSync('can\'t'))
    console.log(`Hunspell server listetning on port ${port}`);
})