/*
 *
 *
 *  Test Build artifacts library
 *
 */



const assert = require('assert')
const artifactsLibrary = require('../../src/artifacts-library')
const projectData = require('../../package.json')


const ARTICFACTS_PATH = 'artifacts'

describe('build-artifacts-library', function() {
    describe('build', function () {
        it('should return a list of files found', function () {
            const artifacts = artifactsLibrary.load(ARTICFACTS_PATH)
            assert(artifacts)
            artifacts.version = projectData.version
            assert(artifactsLibrary.save(`${ARTICFACTS_PATH}/artifacts.json.gz`, artifacts))
        })
    })
})
