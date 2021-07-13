// 递归处理评论
exports.deepParse = (currntNode, allNode) => {
  currntNode.forEach((c_item) => {
    allNode.forEach(
      (a_item) =>
        c_item._id.equals(a_item.parentId) && c_item.children.push(a_item)
    )
    this.deepParse(c_item.children, allNode)
  })
  return currntNode
}
