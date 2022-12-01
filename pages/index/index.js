// pages/demo/demo.js
const app = getApp()

const utils = require("../../utils/utilsLoadData")
app.globalData.hasLogin = true
Page({
    /**
     * 页面的初始数据
     * https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=狄仁杰
     * https://sdzyapi.com/api.php/provide/vod/?ac=detail&wd=
     */
    data: {
      videoAPI: "https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=",
      searchValue: "",
      videoList: [],
      resError: false,
      switchs: 10,
      historyKeyWord: []
    },
    // 搜索按钮
    startRequest(){
        // 搜索开始前，将本次搜索关键字更新
        utils.storage.saveSearchValueLoad(this, this.data.searchValue)
        console.log("正在发起网络请求！")
        const that = this
        wx.request({
            url: this.data.videoAPI + this.data.searchValue,
            success(res){
                console.log(res.data)
                that.setData({
                    videoList: res.data.list,
                    resError: false
                })
            },
            fail(res){
                that.setData({
                    resError: true
                })
            }
        })
    },
    // 电影展示列表的条目点击事件
    jumpPlay(evt){
        const video = this.data.videoList[evt.currentTarget.dataset.index]
      wx.navigateTo({
        // 数据传递方式, 将选中的视频对象转化为json串，通过get请求携带过去
        url: '/pages/play/play?video=' + JSON.stringify(video)
      })
    },
    getHistoryKeyWord(){
        const len = app.globalData.historyKeyWord.length
      return len
    },
    // 获取点击的历史关键字，再发起查询
    keyWordSearch(evt){
        const keyWord = evt.target.dataset.keyword
        this.setData({
            searchValue: keyWord
        })
        this.startRequest()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 将历史关键字加载到小程序
        utils.storage.loadHistoryKeyWord(this)
    },


    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})