# `utils`

> 一些常用的工具类

## 使用

``` sh
npm i @hyjs/utils -S

#or yarn

yarn add @hyjs/utils -S

#or pnpm

pnpm i @hyjs/utils -S
```

### getDevice 获取当前设备
``` ts
getDevice();
// "iOS" | "Android" | "Web"
```
### ieIE 是否IE
``` ts
isIE();
// boolean
```
### isPC 是否PC端
``` ts
isPC();
// boolean
```
### compressImage 压缩图片
``` ts
await compressImage(file);
// Promise<Blob>
```
### downloadFile 下载流文件
> 注意：在请求时需要设置 `headers` 头 `responseType: blob` 
``` ts
downloadFile(data, 'image/jpeg', 'filename');
// filename.jpeg
```
### convertBase64ToFile Base64转File或Blob
``` ts
await convertBase64ToFile(base64, 'file', 'filename');
// Promise<File>

await convertBase64ToFile(base64, 'blob', 'filename');
// Promise<Blob>
```
### fileToBase64 File转Base64
``` ts
await fileToBase64(file);
// Promise<string>
```
### getAudioDuration 获取视频/音频时长
``` ts
await getAudioDuration(file);
// 12s
```
### getAccessType 获取类型函数
``` ts
getAccessType({});
// Object

getAccessType(new RegExp());
// RegExp

getAccessType(Symbol());
// Symbol

...
```
### sleep 休眠函数
``` ts
async function() {
  await sleep(3000);
  // 3s ----
  console.log('log');
}
```
### debounce 防抖函数
``` ts
// debounce(() => {}, 毫秒);
debounce(() => {}, 2000);
```
### throttle 节流函数
``` ts
// throttle(() => {}, 毫秒);
throttle(() => {}, 2000);
```
### convertCurrency 数字转大写金额
``` ts
convertCurrency(987654321);
// 玖亿捌仟柒佰陆拾伍万肆仟叁佰贰拾壹元整
```
### numberToChinese 数字转大写数字
``` ts
numberToChinese(987654321);
// 九億八仟七百六十五萬四仟三百二十一
```
### filterObjectEmpty 过滤对象指定内容
``` ts
filterObjectEmpty({
  a: undefined,
  b: null,
  c: '',
  d: 0
});
// { d: 0 }

filterObjectEmpty({
  a: undefined,
  b: 111,
  c: 222
}, [111, 222]);
// { a: undefined }
```
### random4Code 生成4位code
``` ts
random4Code();
// dsj1
```
### randomChar 生成指定长度的字符，可选择`number`(数字), `lowercase`(小写字母), `capital`(大写字母)
``` ts
randomChar();
// zZqt

randomChar(32);
// w2rAOdMRqhlhNEYzVUv2zw0Zp616rNFp

randomChar(32, ['number']);
// 05099593713036830668381743720300
```
### randomNumber 生成数字
``` ts
randomNumber(100);
// 32

randomNumber(1, 3);
// 2
```
### currency 千分位分隔
``` ts
currency(987654321);
// '987,654,321.00'

currency(987654321, 1);
// '987,654,321.0'

currency(987654321, 0);
// '987,654,321'
```
### toHump 下划线转驼峰
``` ts
toHump('a_bc_d_e');
// aBcDE
```
### toLine 驼峰转下划线
``` ts
toLine('aBcDE');
// a_bc_d_e
```
### uuid 生成uuid
``` ts
uuid();
// 15afbbae-a98b-b07c-df94-e2f916ac1cd1
```

### dateFormatter 时间格式化
``` ts
dateFormatter('YYYY-MM-DD hh:mm:ss');
// 2022-01-13 12:00:00

dateFormatter('YYYY-MM-DD hh:mm:ss', 'Thu Jan 13 2022 12:00:00 GMT+0800 (中国标准时间)')
// 2022-01-13 12:00:00
```

### RegExp+Name 正则校验
使用[anyRule](https://github.com/any86/any-rule)，[在线正则查询](https://any86.github.io/any-rule/)  

- `Strict` 严谨的
- `Loose` 宽松的

``` ts
// RegExpIMEI 手机机身码(IMEI)
RegExpIMEI.test('123456789012345');

// RegExpURL 网址(URL)
RegExpURL.test('www.npmjs.com');
RegExpURL.test('https://www.npmjs.com');
...
```
