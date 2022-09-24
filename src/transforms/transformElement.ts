import { createCallExpression, createStringLiteral, createArrayExpression } from "../ast"
export default function transformElement(node) {
    return () => {
        if(node.type !== 'Element') {
            return
        }
        //创建h函数调用语句，第一个是标签名
        const callExp = createCallExpression('h',[
            createStringLiteral(node.tag)
        ]) 
        
        //处理h函数参数
        node.children?.length ===1 
        ? callExp?.args?.push(node.children[0].jsNode)
        :callExp?.args?.push(createArrayExpression(node.children.map(c => c.jsNode)))
        //将当前标签结点对应的js ast添加到jsNode属性下
        node.jsNode = callExp
    }
}