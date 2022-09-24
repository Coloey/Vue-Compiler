import genNode from "./genNode";
import genNodeList from "./genNodeList";

export function genFunctionDecl(node, context) {
  //从context中取出工具函数
  const { push, indent, deindent } = context;
  //node.id.name即函数名
  push(`function ${node.id.name}`);
  push(`(`);
  //为函数参数生成代码
  genNodeList(node.params, context);
  push(`)`);
  push(`{`);
  indent();
  //为函数生成代码，递归调用genNode
  node.body.forEach((n) => genNode(n, context));
  //取消缩进
  deindent();
  push(`}`);
}
export function genArrayExpression(node, context) {
  const { push } = context;
  push("[");
  //调用genNodeList为数组元素生成代码
  genNodeList(node.elements, context);
  push("]");
}
export function genReturnStatement(node,context) {
  const { push } = context;
  push("return ");
  //genNode函数递归生成返回值代码
  genNode(node.return, context);
}
export function genStringLiteral(node, context) {
  const { push } = context;
  push(`'${node.value}'`);
}
export function genCallExpression(node,context) {
  const { push } = context;
  //取得调用函数名称和参数列表
  const { callee, args } = node;
  push(`${callee.name}(`);
  //调用genNodeList生成参数列表
  genNodeList(args, context);
  push(")");
}
