/*
 *
 *
 *  Test artifacts library
 *
 */



const assert = require('assert')
const artifactsLibrary = require('../../src/artifacts-library')


const ARTICFACTS_PATH = 'artifacts'

describe('build-artifacts-library', () => {
    describe('load', () => {
        it('should return load all of the artifact files', () => {
            const artifacts = artifactsLibrary.load(ARTICFACTS_PATH)
            assert(artifacts)
        })
    })
    describe('save', () => {
        it('should save all artifacts to a gz file', () => {
            const artifacts = artifactsLibrary.load(ARTICFACTS_PATH)
            assert(artifacts)
            assert(artifactsLibrary.save(`/tmp/artifacts.json.gz`, artifacts))
        })
    })
})
