工学云脚本（适配Qx，surge，小火箭）

配置脚本：脚本不支持自定义签到，因为能力有限破解不了签到的sign值，所以只能修改手机定位进行一次签到之后就可以异地签到。签到上下班以中午12点位分界，12点之前是上班，超过12点是下班
打开工学云点击签到，必须上班下班各手动签到一次，提示获取上班Sign、下班Sign等等完成后即可正常签到

使用：
QuantumultX（1.4.2-817）：

准备工作：
安装并信任证书
手动签到之前请打开http抓取功能
打开重写和mitm功能

注意：手动签到之后应禁用重写规则，关闭http获取，避免影响性能

打开qx配置文件写入以下内容
```
[task_local]
;工学云定时签到
0 7,18 * * * https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BOXJS/main/GongXueYun/gxy_update.js, tag=工学云签到

[rewrite_local]
;工学云Cookie获取
^https:\/\/api\.moguding\.net\:9000\/attendence\/clock\/v4\/save url script-request-body https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BOXJS/main/GongXueYun/gxy_cookie.js

[mitm]
hostname = api.moguding.net
```
Surge（5.8.3）：
准备工作：
安装并信任证书
打开rewrite,mitm,脚本功能
手动签到之前打开捕获流量按钮

注意：手动签到完成应关闭捕获流量按钮，注释掉工学云cookie脚本，避免影响性能

打开surge配置文件写入以下内容
```
[Script]
工学云签到 = type=cron,cronexp="0 7,18 * * *",wake-system=0,script-path=https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BOXJS/main/GongXueYun/gxy_update.js,script-update-interval=300,debug=0

//手动签到之后，请禁用以下脚本
工学云Cookie = type=http-request,pattern=^https:\/\/api\.moguding\.net\:9000\/attendence\/clock\/v4\/save,script-path=https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BOXJS/main/GongXueYun/gxy_cookie.js,requires-body=1,script-update-interval=300,max-size=0

[MITM]
hostname = api.moguding.net:9000
```
Shadowrocket（2.2.41）
准备工作：
安装并信任证书
打开https解密
手动签到完成记得关闭https解密和禁用cookie获取脚本

打开小火箭默认配置文件写入以下内容
```
[Script]
工学云签到 = type=cron,script-path=https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BO+XJS/main/GongXueYun/gxy_update.js,cronexpr="0 7,18 * * *",timeout=10,script-update-interval=300,enable=true
工学云Cookie = type=http-request,script-path=https://raw.githubusercontent.com/LeonardoNorskog/TOMM_BOXJS/main/GongXueYun/gxy_cookie.js,pattern=^https:\/\/api\.moguding\.net\:9000\/auttendence\/clock\/v4\/save,max-size=0,requires-body=true,timeout=10,script-update-interval=300,enable=true

[MITM]
hostname = api.moguding.net:9000
```