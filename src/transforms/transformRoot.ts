export default function transformRoot(node:any){
    return () => {
        if(node.type !== 'Root') {
            return;
        }
         //node是根结点，第一个子节点就是模板的根结点
         const vnodeJSAST = node.children[0].jsNode
         node.jsNode = {
            type: 'FunctionDecl',
            id: {type:'Identifier',name:'render'},
            params: [],
            body: [
                {
                type: 'ReturnStatement',
                return: vnodeJSAST
                }
            ]
         }
    }
}