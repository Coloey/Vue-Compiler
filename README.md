#### tokenize 使用有限状态机进行分词

例如：

```js
const tokens = tokenize(`<p>Vue<p>`)
//[
    {type:'tag',name:'p'},
    {type:'text',content:'Vue'},
    {type:'tagEnd',name:'p'}
]
```

#### parse 扫描 token 列表构建 AST

```js
const ast = {
  type: "Root",
  children: [
    {
      type: "Element",
      name: "p",
    },
    {
      type: "Text",
      content: "Vue",
    },
  ],
};
```

#### 递归下降算法和构造转换上下文信息

tarverseNode.ts 中使用递归下降算法访问节点实现对节点的转换，构造一个上下文对象 context，存储 AST 转换函数过程中的上下文数据，实现数据共享

#### 进入与退出

在转换 AST 节点过程中。往往需要根据其子节点的情况来决定如何对当前结点进行转换，因此，将对结点的访问分为两个阶段，即进入阶段和退出阶段，当转换函数处于进入阶段，它会先进入父结点，而当转换函数处于退出阶段，则会先退出子节点，再退出父节点，只要我们在退出阶段对当前访问的节点进行处理，就一定能保证所有子节点都已经被处理

#### 将模板 ast 转为 JavaScript AST

我们的目标是构造渲染函数，渲染函数是由 JavaScript AST 转换来的，因此先将模板 AST 转换为 JavaScript AST,上面的 ast 会被转换为下面的 js ast:

```js
const FunctionDeclNode = {
    type: 'FunctionDecl',//代表该节点时函数声明
    //函数的名称是一个标识符
    id:{
        type:'Identifier',
        name:'render'//name用来存储标识符的名称，在这里是渲染函数的名称
    },
    params:[],
    body:[
        {
            type:'ReturnStatement',
            //最外层h函数的调用
            return {
                type: 'CallExpression',
                callee:{type:'Identifier',name:'h'},
                args: [
                    type: 'StringLiteral',
                    value: 'p'
                ]
                {
                    type:'StringLiteral',
                    value:'Vue'
                }

            }
        }
    ]
}
```

#### 代码生成

generate 函数将 js ast 生成代码
