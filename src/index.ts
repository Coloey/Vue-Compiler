import compile from "./compile"
import path from "path"
import fs from "fs"
/*const parse = require("./parse")
const transform = require("./transform")
const generate = require("./generate")
const path = require("path")
const fs= require("fs")*/
const code = compile(`<div><p>Vue</p></div>`)
const fileName = 'compileResult'

fs.writeFileSync(
    path.resolve(__dirname,`./target/${fileName}.js`),
    code
)
