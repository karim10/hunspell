import { Nodehun } from 'nodehun';
import fs from 'fs';

const affix = fs.readFileSync('./dictionaries/en_us/en_us_med.aff');
const dictionary = fs.readFileSync('./dictionaries/en_us/en_us_med.dic');

export const nodehun = new Nodehun(affix, dictionary);