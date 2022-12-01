// pages/play/play.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      video: {},
      videoURL: [],
      current: "",
      switchs: 10,
      videoType: false
    },
    // 选集按钮，接收按钮携带的索引，修改current变量保存的视频链接
    switchVideo(evt){
      this.setData({
        current: this.data.videoURL[evt.target.dataset.index]
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(JSON.parse(options.video))
        this.setData({
            video: JSON.parse(options.video)
        })
        // 处理集数
        this.handleVideoURL(this.data.video.vod_play_url)
        // 判断当前视频类型是不是电视剧，默认不是
        if(this.data.videoURL.length > 1){
            this.setData({
                videoType: true
            })
        }
        // 设置播放器默认为第一集
        this.setData({
            current: this.data.videoURL[0]
        })
    },

    // 将视频地址分解
    handleVideoURL(url){
      // 以#号为分集标志，分解为数组
      this.setData({
        videoURL: url.split('#')
      })
      const array = this.data.videoURL;
      for (let index = 0; index < array.length; index++) {
        const k = array[index].indexOf('http')  // 获取http第一次出现的位置
        const result = array[index].substring(k)   // 从http索引出开始截取后面字符
        array[index] = result     // 结果重新赋值
      }
      this.setData({
        videoURL: array
      })
    },

    // 集数区间选择 
    switchVideos(evt){
        // console.log(evt.target.dataset.index)
        const index = evt.target.dataset.index
        this.setData({
            switchs: (index+1)*10
        })
        console.log("区间选择：" + this.data.switchs)
    },
    // 剧集选择
    playSwitchVideo(evt){
        const index = evt.target.dataset.index
        if( index < this.data.videoURL.length){
            this.setData({
                current: this.data.videoURL[index]
            })
            console.log("剧集选择：" + index)
        }else{
            console.log("playSwitchVideo error")
        }
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