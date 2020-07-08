#!/usr/bin/node

const argparse = require('argparse')
const wallet = require('ethereumjs-wallet')
const EthereumHDKey = require('ethereumjs-wallet/hdkey')
const bip39 = require('bip39')
const fs = require('fs')


const parser = argparse.ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Conver a mnemonic to keystore files with'
})

parser.addArgument('mnemonic',
    {
        help: 'mnemonic of your wallet'
    }
)
parser.addArgument('folder',
    {
        help: 'folder to write the key store files'
    }
)
parser.addArgument('password',
    {
        help: 'password to encrypte the key store files'
    }
)

parser.addArgument(
    ['-c', '--count'],
    {
        help: 'address count. Default: 20'
    }
)
parser.addArgument(
    ['-n', '--dry-run'],
    {
        action: 'storeTrue',
        help: 'do not do anything just run, and show the files that will be writtern'
    }
)

const args = parser.parseArgs()

const walletHDPath = `m/44'/60'/0'/0/`
const maxAddressCount = args.count || 20

const hdWallet = EthereumHDKey.fromMasterSeed(bip39.mnemonicToSeed(args.mnemonic))
for ( let index = 0; index < maxAddressCount; index ++) {
    const wallet = hdWallet.derivePath(`${walletHDPath}${index}`).getWallet()
    const address = wallet.getChecksumAddressString()

    const filename = address.replace('0x', '')
    const filePath = `${args.folder}/${filename}.json`
    if (args.dry_run) {
        console.log(`Will write a key store data to ${filePath}`)

    } else {
        console.log(`Writing key data to ${filePath}`)
        const keyText = JSON.stringify(wallet.toV3(args.password))
        fs.writeFileSync(filePath, keyText)
    }
}
