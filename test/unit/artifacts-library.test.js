/*
 *
 *
 *  Test artifacts library
 *
 */



const assert = require('assert')
const artifactsLibrary = require('../../src/artifacts-library')


const artifactsPath = 'artifacts'

describe('build-artifacts-library', () => {
    describe('load', () => {
        it('should load all of the artifact files', () => {
            const artifacts = artifactsLibrary.loadFiles(artifactsPath)
            assert(artifacts)
            assert(artifacts['1337'])
        })
        it('should load selected artifact files equal to a given network id', () => {
            const artifacts = artifactsLibrary.loadFiles(artifactsPath, { 'eq': 1337 })
            assert(artifacts)
            assert(artifacts['1337'])
        })
        it('should load selected artifact files not equal to a given network', () => {
            const artifacts = artifactsLibrary.loadFiles(artifactsPath, { 'neq': 0 })
            assert(artifacts)
            assert(artifacts['1337'])
        })


    })
    describe('save', () => {
        it('should save all artifacts to a gz file', () => {
            const artifacts = artifactsLibrary.loadFiles(artifactsPath)
            assert(artifacts)
            assert(artifactsLibrary.savePackage(`/tmp/artifacts.json.gz`, artifacts))
        })
    })
})
