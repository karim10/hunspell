import { Nodehun } from 'nodehun';
import fs from 'fs';

const affix = fs.readFileSync('./dictionaries/fr_fr/fr_fr_med.aff');
const dictionary = fs.readFileSync('./dictionaries/fr_fr/fr_fr_med.dic');

export const nodehun = new Nodehun(affix, dictionary);