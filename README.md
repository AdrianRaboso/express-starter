# express-starter
Project created to take first steps with Express.js, MongoDB and more backend's implementations.

## Start and debug
To start the project all you have to do is install [npm](https://www.npmjs.com/) dependencies with:
```bash
npm install
```

Next step is runnning dev server:
```bash
npm run dev
```
This command starts a ts-node server for development purposes.

Finally, if you want to debug the project there are several ways to do so depending on your development environment.
In my case I use **Visual Studio Code**:

1. Run command **tsc** to transpile the TypeScript code into JavaScript inside */build* folder:
```bash
npm run tsc
```
2. Press **F5** to start debugging.

Alternative way is configurate a VSCode **task** to do this process automatically.
See more [info](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) of how to debug in VSCode.

### To do
- Create project structure. ✅
- Express.js initialation. ✅
- Add environment config. ✅
- MongoDB connection. ✅
- Add Mongoose ORM.
- Implement JWT authoritation.
- ...