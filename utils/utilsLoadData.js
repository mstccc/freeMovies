const app = getApp()

// 本地存储相关模块
const storage = {
  // 存储搜索关键字到本地
  saveSearchValueLoad(that, value) {
      // index页面的historyKeyWord数组变量，保存实时展示的历史关键字
    const array = that.data.historyKeyWord
    // 定义一个新数组  
    var temp = [value];
    // 关键字重组：
      // 最新的数据一定在第一位
      // 如果新数据重复，将其剔除
      // 历史记录只保留6个
    for (let i = 0; i < array.length && i < 5; i++) {
        // 遍历数组，将不等于关键字的其他关键字保存到临时数组的后面
      if(array[i] != value){
        temp = [...temp, array[i]]
      }
    }
    // 将处理好的新数组保存到本地，保存形式为JSON
    wx.setStorage({
        key: 'historyKeyWord',
        data: JSON.stringify(temp)
    })
    // 保存完成后，将新数组信息更新到index页面，依靠实时渲染，页面会自动更新成新数据
    that.setData({
        historyKeyWord: temp
    })
    console.log("关键字数组更新成功: " + that.data.historyKeyWord)
  },
  // 获取历史关键字，传入调用本函数的页面上下文，自动赋值
  loadHistoryKeyWord(that){
      wx.getStorage({
          key: 'historyKeyWord',
          success(res){
            that.setData({
                historyKeyWord: JSON.parse(res.data)
            })
            console.log("历史关键字："+that.data.historyKeyWord)
          }
      })
  }
}

module.exports = {
  storage
}