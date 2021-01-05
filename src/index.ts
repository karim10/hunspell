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

app.use(express.json({ limit: '50mb' }));

app.post('/spell', async (req: express.Request<SpellRequest>, res: express.Response) => {
    const { locale, words } = req.body as SpellRequest;
    // const mispelledWords = words.filter(w => !nodehun.spell(w.str));
    const misspelledWords: any = []
    const correctWords: any = [];
    console.log(words);
    
    console.log('words received: ', words.length);
    console.time("spell_performance");
    for (let i = 0; i < words.length; i++) {
        const spellResult = await nodehun.spell(words[i].str);
        if (!spellResult)
            misspelledWords.push(words[i]);
        else correctWords.push(words[i])
    }
    console.timeEnd("spell_performance");
    
    return res.json({
        misspelledWords,
        correctWords
    });
})

app.listen(port, () => {
    console.log(`Server listening to ${port} port.`)
})




