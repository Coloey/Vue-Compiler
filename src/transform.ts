import traverseNode from "./traverseNode";
import transformElement from "./transforms/transformElement";
import transformText from "./transforms/transformText";
import transformRoot from "./transforms/transformRoot";
export default function transform(ast) {
    const context = {
      //增加currentNode用来存储当前正在转换的结点
      currentNode: null,
      //增加currentIndex，用来存储当前结点在父结点的children中的位置索引
      childIndex: 0,
      //增加parant用来存储当前转换结点的父结点
      parent: null,
      //用于替换结点的函数，接收新节点作为参数
      replaceNode(node) {
        //为了替换结点，需要修改AST
        //找到当前结点在父结点的children位置：context.childIndex
        //使用新节点替换
        context.parent.children[context.childIndex] = node;
        context.currentNode = node;
      },
      //用于移除当前访问结点
      removeNode() {
        //根据当前结点在父结点中的索引删除结点
        context.parent.children.splice(context.childIndex, 1);
        context.currentNode = null;
      },
      nodeTransforms: [transformRoot,transformElement, transformText],
    };
    traverseNode(ast, context);
  }