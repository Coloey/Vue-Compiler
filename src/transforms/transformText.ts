import { createStringLiteral } from "../ast"
export default function transformText(node:any) {
    if(node.type !== 'Text') {
        return
    }
    node.jsNode = createStringLiteral(node.content)
}