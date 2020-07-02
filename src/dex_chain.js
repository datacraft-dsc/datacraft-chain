#!/usr/bin/env node

/*

    Command line App


*/


const commandLineArgs = require('command-line-args')

const mainDefinitions = [
    { name: 'command', defaultOption: true },
    { name: 'help', type: Boolean, alias: 'h'},
]

const mainOptions = commandLineArgs(mainDefinitions, { partial: true, stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

console.log('mainOptions\n===========')
console.log(mainOptions)

/* second - parse the build command options */
if (mainOptions.command === 'build') {
    const buildDefinitions = [
        { name: 'artifacts', type: String, alias: 'a' },
    ]
    console.log(argv)
    const buildOptions = commandLineArgs(buildDefinitions, { argv })

    console.log('\nbuildOptions\n============')
    console.log(buildOptions)
}
