import JsonBody from './body.json';
import fetch from 'node-fetch';

async function loopRequests() {
    for (let i = 1; i <= 1000; i++) {
        console.time(`request number: ${i}`)
        await fetch('http://locahost:4000/spellAsync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(JsonBody),
        }).then(() => {
            console.timeEnd(`request number: ${i}`)
        }).catch(e => console.log(`Error: ${e}`)) 

        setTimeout(() => {
            console.log('wait for 1s');
        }, 1000);
    }
}

loopRequests();