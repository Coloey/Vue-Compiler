import genNode from "./genNode"
//为函数生成代码
export default function genNodeList(nodes,context) {
    const {push} = context
    if(nodes){
      for(let i=0;i<nodes.length;i++){
        const node = nodes[i]
        genNode(node,context)
        if(i < nodes.length-1){
          push(',')
        } 
      }

    }
   
  }