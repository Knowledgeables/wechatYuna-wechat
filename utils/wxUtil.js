function toastSuccess(msg)
{
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  })
}

function toastMsg(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
module.exports = {
  toastSuccess: toastSuccess,
  toastMsg: toastMsg
}
