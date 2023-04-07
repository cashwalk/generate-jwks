#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const { exportJWK, generateKeyPair } = require('jose');

const program = new Command();
//
program
    .option('--alg <alg>', 'algorithm')
    .option('--crv <crv>', 'curve')
    .option('--output', 'output file')
    .action(async ({ alg, crv, output }) => {
        const keyPair = await generateKeyPair(alg, { crv });

        const privateKey = await exportJWK(keyPair.privateKey);
        const publicKey = await exportJWK(keyPair.publicKey);

        console.log(`**** privateJwk ****\n${JSON.stringify(privateKey)}`);
        console.log(`**** publicJwk ****\n${JSON.stringify(publicKey)}`);

        if (output) {
            fs.writeFileSync('key.json', JSON.stringify(privateKey));
            fs.writeFileSync(`pub-key.json`, JSON.stringify(publicKey));
        }
    });

program.parse(process.argv);
