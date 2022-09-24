export interface StateInterface{
    initial: number,
    tagOpen: number,
    tagName: number,
    text: number,
    tagEnd: number,
    tagEndName: number
}

export interface AstNode {
    type: string,
    tag?:string,
    children?:Array<AstNode>,
    jsNode?: any
}
