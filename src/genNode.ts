import { genArrayExpression, genFunctionDecl,genReturnStatement,genCallExpression,genStringLiteral} from "./gen"
export default function genNode(node,context) {
    switch(node?.type) {
      case 'FunctionDecl':
        genFunctionDecl(node,context)
        break
      case 'ReturnStatement':
        genReturnStatement(node,context)
        break
      case 'CallExpression':
        genCallExpression(node,context)
        break
      case 'StringLiteral':
        genStringLiteral(node,context)
        break
      case 'ArrayExpression':
        genArrayExpression(node,context)
        break
    }
  }