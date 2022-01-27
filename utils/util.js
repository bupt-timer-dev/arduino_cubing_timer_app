const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatShortTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return month + '/' + day;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function msToStr(ms) {
  let minute = Math.floor(ms / 60000)
  ms = ms % 60000
  let str = (ms / 1000).toFixed(3)
  if (ms < 10000) str = "0" + str
  if (minute > 0) str = minute + ":" + str
  return str
}
module.exports = {
  formatTime,
  formatShortTime,
  msToStr
}