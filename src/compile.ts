import parse from "./parse"
import generate from "./generate"
import transform from "./transform"
/*import path from "path"
import fs from "fs"*/
export default function compile(template) {
    //模板AST
    const ast = parse(template)
    /*fs.writeFileSync(
        path.resolve(__dirname,`./target/ast.js`),
        ast
    )*/
    
    //将模板ast转换为JavaScript AST
    transform(ast)
    const code = generate(ast.jsNode)
    return code
}
