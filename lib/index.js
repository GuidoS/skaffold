const { mkdirSync, writeFileSync, readFileSync } = require('fs')

const args = process.argv.slice(2)

function makeDirs (projectName) {
  // Here we want to make sure our directories exist.
  mkdirSync(`${projectName}`)
  mkdirSync(`${projectName}/bin`, { recursive: true })
  mkdirSync(`${projectName}/doc`, { recursive: true })
  mkdirSync(`${projectName}/lib`, { recursive: true })
  mkdirSync(`${projectName}/test`, { recursive: true })
  mkdirSync(`${projectName}/test/lib`, { recursive: true })
}

function generate (projectName) {
  makeDirs(projectName)
  writeFileSync(
    `${projectName}/package.json`,
    `{
      "name": "${projectName}",
      "version": "1.0.0-0",
      "description": "",
      "main": "index.js",
      "directories": {
        "lib": "lib",
        "test": "test",
        "bin": "bin"
      },
      "scripts": {
        "test": "jest",
        "test:watch": "jest --watch"
      },
      "keywords": [],
      "private": true,
      "devDependencies": {
        "jest": "^27.4.3",
        "standard": "^16.0.4"
      }
    }
    `
  )
  writeFileSync(
    `${projectName}/lib/index.js`,
    '// Please follow JSDoc standards for commenting.\n'
  )
  writeFileSync(
    `${projectName}/test/lib/index.test.js`,
    '// Please follow Jest Async/Await testing methodology\n' +
    '// https://jestjs.io/docs/asynchronous#asyncawait\n\n' +
    'const index = require(../lib)\n' +
    'describe(\'lib/index.js\',()=>{\n' +
    '  it(\'return null\',async=>{\n' +
    '  expect.assertions()\n' +
    '  })\n' +
    '})'
  )
  writeFileSync(
    `${projectName}/CHANGELOG.md`,
    readFileSync('CHANGELOG.md', 'utf8')

  )
  writeFileSync(
    `${projectName}/README.md`,
    readFileSync('README.md', 'utf8')

  )
}

generate(args[0])
