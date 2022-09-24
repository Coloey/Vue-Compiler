import { StateInterface } from "./type";
const State: StateInterface = {
    initial: 1,
    tagOpen: 2,
    tagName: 3,
    text: 4,
    tagEnd: 5,
    tagEndName: 6
}
function isAlpha(char:string):boolean {
    return (char >= "a" && char <= "z" ) || (char >= "A" && char <= "Z")
}
//接收模板字符串作为参数，并将模板切割为Token返回
function tokenize(str) {
  //设置状态机的当前状态为初始状态
  let currentState = State.initial;
  //用于缓存字符
  const chars = [];
  //生成的token会存储到tokens中，并作为函数返回值返回
  const tokens = [];
  //使用while循环开启自动机，只要模板字符串没有被消费完，自动机一直运行
  while (str) {
    //查看第一个字符只是查看，没有消费
    const char = str[0];
    //switch语句匹配状态
    switch (currentState) {
      //状态机处于初始状态
      case State.initial:
        //遇到字符<
        if (char === "<") {
          //切换到标签开始状态
          currentState = State.tagOpen;
          //消费字符
          str = str.slice(1);
        } else if (isAlpha(str)) {
          //初始状态下遇到文本，切换到文本状态
          currentState = State.text;
          //将当前文本存到chars数组
          chars.push(char);
          //消费字符
          str = str.slice(1);
        }
        break;
      //状态机处于标签开始状态
      case State.tagOpen:
        //遇到字母，切换到标签名称状态
        if (isAlpha(char)) {
          currentState = State.tagName;
          //将当前字符缓存到chars数组
          chars.push(char);
          str = str.slice(1);
        } else if (char === "/") {
          //遇到"/"切换到标签结束状态
          currentState = State.tagEnd;
          str = str.slice(1);
        }
        break;
      //状态机处于标签名状态
      case State.tagName:
        //遇到字母，仍然处于标签名状态，不需要切换状态
        //但需要将字符缓存进chars数组
        if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        } else if (char === ">") {
          //切换到初始状态
          currentState = State.initial;
          //同时创建一个标签Token,并添加到tokens数组
          //此时chars数组中缓存的就是标签名
          tokens.push({
            type: "tag",
            name: chars.join(""),
          });
          //chars数组已经被消费，清空
          chars.length = 0;
          //同时消费当前字符>
          str = str.slice(1);
        }
        break;
      //状态机处于文本状态
      case State.text:
        if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        } else if (char === "<") {
          //切换标签开始状态
          currentState = State.tagOpen;
          //从文本状态到标签开始状态，此时应该创建文本Token,并添加到tokens数组
          //chars数组中的内容就是文本内容
          tokens.push({
            type: "text",
            content: chars.join(""),
          });
          //清空数组内容
          chars.length = 0;
          str = str.slice(1);
        }
        break;
      //状态机处于标签结束状态
      case State.tagEnd:
        ///遇到字母切换到标签结束名
        if (isAlpha(char)) {
          currentState = State.tagEndName;
          chars.push(char);
          str = str.slice(1);
        }
        break;
      //状态机处于结束标签名称状态
      case State.tagEndName:
        if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        } else if (char === ">") {
          currentState = State.initial;
          tokens.push({
            type: "tagEnd",
            name: chars.join(""),
          });
        }
        chars.length = 0;
        str = str.slice(1);
        break;
    }
  }
  //最后返回tokens
  return tokens;
}
export default tokenize