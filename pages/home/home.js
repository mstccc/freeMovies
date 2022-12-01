// pages/home/home.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputValue: "",
        dataList: ["achong","zhangsan","lisi","wangwu"],
        videoAPI: 'https://api.1080zyku.com/inc/apijson.php?ac=detail&wd='
    },
    handleInput(evt){
        console.log(evt.detail.value)
        this.setData({
            inputValue: evt.detail.value
        })
    },
    handleAdd(){
        this.setData({
            dataList: [...this.data.dataList, this.data.inputValue],
            inputValue: ""
        })
    },
    deleteData(evt){
        // console.log("delete", evt.target.dataset.index)
        this.data.dataList.splice(evt.target.dataset.index,1)
        this.setData({
            dataList: this.data.dataList
        })
    }
})