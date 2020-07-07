
/**/

// Handle truffle exec


async function main() {



}

module.exports = function(callback) {
    main().then(() => callback()).catch(err => callback(err))
};
