# Home Library Service

## Downloading

```
git clone https://github.com/m208/nodejs2022Q4-service.git
git checkout dev/PostgreSQL-+-Docker
```

## Installing NPM modules

```
npm install
```

### In case of errors try 
```
npm install --force
```

## Running application

Run Docker Desktop, then run commands:
```
docker-compose build
docker-compose up
```

App will be started in docker container. 

You can access it at http://localhost:4000

OpenAPI documentation avaialable at http://localhost:4000/doc/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
