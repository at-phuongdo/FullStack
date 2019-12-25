## Running tests one by one
The command only runs the tests found in the tests/note_api.test.js file:
```
npx jest tests/note_api.test.js --runInBand
```

The -t option can be used for running tests with a specific name:
```
npx jest -t 'a specific note is within the returned notes'
```

The provided parameter can refer to the name of the test or the describe block. The parameter can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:
```
npx jest -t 'notes' --runInBand
```
