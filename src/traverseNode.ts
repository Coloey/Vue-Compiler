export default function traverseNode(ast, context) {
    //增加一个退出阶段回调函数数组
    const exitFns = []
    //设置当前转换的结点信息context.currentNode
    context.currentNode = ast;
    const transforms = context.nodeTransforms;
    //执行对结点的操作
    for (let i = 0; i < transforms.length; i++) {
      const onExit = transforms[i](context.currentNode);
      if(onExit){
        //将退出阶段的回调函数添加到exitFns数组中
        exitFns.push(onExit)
      }
      if(!context.currentNode)return
    }
    const children = context.currentNode.children 
    //执行对结点的深度遍历访问
    if(children){
      for (let i = 0; i < children.length; i++) {
        //递归调用traverseNode转换子节点之前，将当前结点设置为父结点
        context.parent = context.currentNode 
        //设置位置索引
        context.childIndex = i;
        //递归调用时，将context透传
        traverseNode(children[i], context);
      }
    }
    
    //在节点处理的最后阶段执行缓存到exitFns中的回调函数
    let i = exitFns.length
    while(i--){
      exitFns[i]()
    }
  }
  