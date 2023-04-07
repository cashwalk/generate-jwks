#!/usr/bin/env node

const { Command } = require('commander');
const { exportJWK, generateKeyPair } = require('jose');
const fs = require('fs');

const program = new Command();

program.addHelpText('after', `
    algorithm examples: 
    - EdDSA
    - RS256
    - ES256
    - PS256 
    ...

    For more details and supported algorithms, see:
    https://github.com/panva/jose/blob/1314d9ac15f191418c864d6bcd52942ba91f75b0/src/runtime/node/generate.ts#L42
`);

program
    .option('--alg <alg>', 'algorithm')
    .option('--crv <crv>', 'curve')
    .option('--output', 'output file')
    .action(async ({ alg, crv, output }) => {
        if(!alg) return program.outputHelp();

        const keyPair = await generateKeyPair(alg, { crv });

        const privateKey = await exportJWK(keyPair.privateKey);
        const publicKey = await exportJWK(keyPair.publicKey);

        console.log(`\n - alg: ${alg}`)
        console.log(` - crv: ${crv}\n`)
        console.log(`============= PrivateJwk =============\n${JSON.stringify(privateKey)}`);
        console.log(`============= PublicJwk =============\n${JSON.stringify(publicKey)}\n`);

        if (output) {
            fs.writeFileSync('key.json', JSON.stringify(privateKey));
            fs.writeFileSync(`pub-key.json`, JSON.stringify(publicKey));
        }
    });

program.parse(process.argv);