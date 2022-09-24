//创建JS AST辅助函数
export const createIdentifier = (name) => {
  return {
    type: "Identifier",
    name,
  };
};
export const createStringLiteral = (value) => {
  return {
    type: "StringLiteral",
    value,
  };
};
//创建ArrayExpression节点
export const createArrayExpression = (elements) => {
  return {
    type: "ArrayExpression",
    elements,
  };
};
//创建函数调用节点
export const createCallExpression = (callee,args) => {
  return {
    type: "CallExpression",
    callee: createIdentifier(callee),
    args,
  };
};
