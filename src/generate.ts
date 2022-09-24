import genNode from "./genNode";
export default function generate(node) {
    const context = {
      code: '',
      push(code) {
        context.code += code
      },
      //当前缩进的级别，初始值为0，即没有缩进
      currentIndent: 0,
      //该函数用来换行，即在代码字符串后面追加\n字符,换行时保留缩进
      newLine(){
        context.code+= '\n'+` `.repeat(context.currentIndent)
      },
      //用来缩进,即让currentIndent自增后调用换行函数
      indent(){
        context.currentIndent++;
        context.newLine()
      },
      //取消缩进
      deindent(){
        context.currentIndent--;
        context.newLine()
      }
    }
    genNode(node,context)
    return context.code
  } 