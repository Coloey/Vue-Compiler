import tokenize from "./tokenize";
import {AstNode} from "./type";
//扫描token列表构建AST
//parse函数接收模板作为参数
function parse(str:string) {
    //对模板标记化，得到Tokens
    const tokens = tokenize(str)
    //创建Root节点
    const root :AstNode= {
        type: 'Root',
        children: []
    }
    //创建elementStack,起初只有Root根结点
    const elementStack = [root]
    //开启一个while循环扫描tokens。直到所有Token都被扫描完为止
    while(tokens.length) {
        //获取栈顶节点作为父结点
        const parent = elementStack[elementStack.length-1]
        //当前扫描到的token
        const t = tokens[0]
        switch(t.type) {
            case 'tag':
                //token是开始标签，创建Element类型的AST节点
                const elementNode = {
                    type: 'Element',
                    tag: t.name,
                    children: []
                }
                parent.children.push(elementNode)
                elementStack.push(elementNode)
                break;
            case 'text':
                const textNode = {
                    type: 'Text',
                    content: t.content
                }
                parent.children.push(textNode)
                break;
            case 'tagEnd':
                //遇到结束标签，将栈顶节点弹出
                elementStack.pop()
                break
        }
        //消费已经扫描过的token
        tokens.shift()
    }
    return root
}
export default parse