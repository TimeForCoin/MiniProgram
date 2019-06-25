//index.js
const app = getApp()
const server = require('../../services/server.js')
const util = require('../../utils/util.js')

Page({
  data: {
    questionnaire: {},
    problems: [],
    taskID: ''
  },
  onLoad: async function(options) {
    // this.data.taskID = options.id
    const res = await server.request('GET', 'questionnaires/' + this.data.taskID)
    const questionsRes = await server.request('GET', 'questionnaires/' + this.data.taskID + '/questions')
    this.setData({
      questionnaire: res.data,
      problems: questionsRes.data.problems,
      taskID: this.data.taskID,
    })
    console.log(this.data)
  },

  onChangeRadio: function(e) {
    const pIndex = e.currentTarget.dataset.index
    this.data.problems[pIndex].value = parseInt(e.detail.value)
  },

  onChangeCheckbox: function(e) {
    const pIndex = e.currentTarget.dataset.index
    const cIndexs = e.detail.value
    if (cIndexs.length <= this.data.problems[pIndex].choose_problem.max_choose) {
      for (let i in this.data.problems[pIndex].choose_problem.options) {
        this.data.problems[pIndex].choose_problem.options[i].checked = false
      }
      this.data.problems[pIndex].value = []
      for (let i of cIndexs) {
        const aIndex = parseInt(i)
        this.data.problems[pIndex].choose_problem.options[aIndex].checked = true
        this.data.problems[pIndex].value.push(aIndex)
      }
    } else {
      wx.showToast({
        title: '最多可以选' + this.data.problems[pIndex].choose_problem.max_choose + '项',
      })
    }
    this.setData({
      problems: this.data.problems
    })

  },

  onChangeInput: function(e) {
    const pIndex = e.currentTarget.dataset.index
    this.data.problems[pIndex].value = e.detail.value
  },

  onChangeScore: function(e) {
    const pIndex = e.currentTarget.dataset.index
    this.data.problems[pIndex].value = e.detail.value
  },

  onSubmit: async function(e) {
    let ans = []
    for (let p of this.data.problems) {
      switch (p.type) {
        case 'choose':
          if (p.choose_problem.max_choose == 1) {
            if (p.value === undefined) {
              wx.showToast({
                title: '请填写第' + p.index + '题',
                icon: 'none'
              })
              return;
            }
            ans.push({
              'problem_index': p.index,
              'choose_value': [p.value],
            })
          } else {
            if (p.value === undefined || p.value.length === 0) {
              wx.showToast({
                title: '请填写第' + p.index + '题',
                icon: 'none'
              })
              return;
            }
            ans.push({
              'problem_index': p.index,
              'choose_value': p.value,
            })
          }
          break;
        case 'fill':
          if (p.value === undefined || p.value === "") {
            wx.showToast({
              title: '请填写第' + p.index + '题',
              icon: 'none'
            })
            return;
          }
          ans.push({
            'problem_index': p.index,
            'string_value': p.value,
          })
          break;
        case 'score':
          if (p.value === undefined) {
            p.value = 3
          }
          ans.push({
            'problem_index': p.index,
            'score_value': p.value,
          })
          break;
      }
    }
    console.log(ans)
    const res = await server.request('POST', 'questionnaires/' + this.data.taskID + '/answers', {
      data: ans
    })
    if (res.statusCode === 200) {
      wx.showToast({
        title: '提交成功',
      })
      wx.navigateBack({})
    } else {
      wx.showToast({
        title: '提交失败',
      })
    }
  }
})