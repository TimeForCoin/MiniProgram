const ROOT = 'http://127.0.0.1:30233/'

module.exports = {
  request: (method, url, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        method: method,
        url: ROOT + url,
        header: {
          cookie: "time-for-coin=" + wx.getStorageSync("sessionId")
        },
        data: data,
        success: (res) => {
          if (res.cookies.length > 0) {
            let sessionID = res.cookies[0].match(/time-for-coin=(\S*);/)[1]
            wx.setStorageSync("sessionId", sessionID)
          }
          resolve(res)
        },
        fail: () => {
          reject()
        }
      })
    })
  }
}
