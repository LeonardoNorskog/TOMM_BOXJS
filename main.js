const cookieName = '小懒工具箱'
const tokenKey = 'tl_sign'


const chavy = init()
const tokenVal = chavy.getdata(tokenKey)

sign()

function sign() {
  let url = { url: `https://wxapp.xiaolankj.top/api/app/user.php?act=userCheckIn`, headers: { } }
  url.headers['token'] = `${tokenVal}`
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43(0x18002b29) NetType/WIFI Language/zh_CN'
  chavy.get(url, (error, response, data) => {
    const result = JSON.parse(data)
    const title = `${cookieName}`
    let subTitle = ``
    let detail = ``
    if (result.code === 2) {

        subTitle = `签到结果: 成功`
        detail = `说明: ${result.msg}`
        chavy.msg(title, subTitle, detail)
    }
    chavy.log(`${cookieName}, data: ${data}`)

    chavy.done()

  })


}


function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}