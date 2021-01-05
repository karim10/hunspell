import { Nodehun } from 'nodehun';
import { readFileSync } from 'fs';

const affix = readFileSync('./dictionaries/en_us/en_us_med.aff');
const dictionary = readFileSync('./dictionaries/en_us/en_us_med.dic');

export const nodehun = new Nodehun(affix, dictionary);