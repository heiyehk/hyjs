/**
 * https://github.com/any86/any-rule
 * @see https://github.com/any86/any-rule/blob/cfc0ce47c47aa39bae31a5328f7ccfaeeb91dd63/packages/www/src/RULES.js
 * @author any86
 */
/**
 * 火车车次
 *
 * @example
 * G1868,D102,D9,Z5,Z24,Z17
 */
export declare const RegExpTrain: RegExp;
/**
 * 手机机身码(IMEI)
 *
 * @example
 * 123456789012345,1234567890123456,12345678901234567
 */
export declare const RegExpIMEI: RegExp;
/**
 * 必须带端口号的网址(或ip)
 *
 * @example
 * https://www.qq.com:8080,127.0.0.1:5050,baidu.com:8001,http://192.168.1.1:9090
 */
export declare const RegExpIP: RegExp;
/**
 * 网址(URL)
 *
 * @example
 * www.qq.com,https://vuejs.org/v2/api/#v-model,www.qq.99,//www.qq.com,www.腾讯.cs,ftp://baidu.qq,http://baidu.com,https://www.amap.com/search?id=BV10060895&city=420111&geoobj=113.207951%7C29.992557%7C115.785782%7C31.204369&query_type=IDQ&query=%E5%85%89%E8%B0%B7%E5%B9%BF%E5%9C%BA(%E5%9C%B0%E9%93%81%E7%AB%99)&zoom=10.15,360.com:8080/vue/#/a=1&b=2
 */
export declare const RegExpURL: RegExp;
/**
 * 统一社会信用代码
 *
 * @example
 * 91230184MA1BUFLT44,92371000MA3MXH0E3W
 */
export declare const RegExpSocialCreditCodeStrict: RegExp;
/**
 * 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
 *
 * @example
 * 91110108772551611J,911101085923662400
 */
export declare const RegExpSocialCreditCode: RegExp;
/**
 * 迅雷链接
 *
 * @example
 * thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=
 */
export declare const RegExpThunder: RegExp;
/**
 * ed2k链接(宽松匹配)
 *
 * @example
 * ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/
 */
export declare const RegExpEd2k: RegExp;
/**
 * 磁力链接(宽松匹配)
 *
 * @example
 * magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC
 */
export declare const RegExpMagnet: RegExp;
/**
 * 子网掩码(不包含 0.0.0.0)
 *
 * @example
 * 255.255.255.0,255.255.255.255,255.240.0.0
 */
export declare const RegExpSubNet: RegExp;
/**
 * linux"隐藏文件"路径
 *
 * @example
 * /usr/ad/.dd,/root/.gitignore,/.gitignore
 */
export declare const RegExpLinuxHiddenDirPath: RegExp;
/**
 * linux文件夹路径
 *
 * @example
 * /usr/ad/dd/,/,/root/,/ a a / a / a a /
 */
export declare const RegExpLinuxDirPath: RegExp;
/**
 * linux文件路径
 *
 * @example
 * /root/b.ts,/root/abc
 */
export declare const RegExpLinuxFilePath: RegExp;
/**
 * window"文件夹"路径
 *
 * @example
 * C:\Users\Administrator\Desktop,e:\m\
 */
export declare const RegExpWindowsDirPath: RegExp;
/**
 * window下"文件"路径
 *
 * @example
 * C:\Users\Administrator\Desktop\qq.link,e:\m\vscode.exe
 */
export declare const RegExpWindowsFilePath: RegExp;
/**
 * 股票代码(A股)
 *
 * @example
 * sz000858,SZ002136,sz300675,SH600600,sh601155
 */
export declare const RegExpStockA: RegExp;
/**
 * 大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数
 *
 * @example
 * 150,100.5
 */
export declare const RegExpGrade: RegExp;
/**
 * html注释
 *
 * @example
 * <!--<div class="_bubble"></div>--><div>chenguzhen87</div><div class="_bubble"></div>-->
 */
export declare const RegExpHTMLAnnotation: RegExp;
/**
 * md5格式(32位)
 *
 * @example
 * 21fe181c5bfc16306a6828c1f7b762e8
 */
export declare const RegExpMD5: RegExp;
/**
 * GUID/UUID
 *
 * @example
 * e155518c-ca1b-443c-9be9-fe90fdab7345,41E3DAF5-6E37-4BCC-9F8E-0D9521E2AA8D,00000000-0000-0000-0000-000000000000
 */
export declare const RegExpUuid: RegExp;
/**
 * 版本号(version)格式必须为X.Y.Z
 *
 * @example
 * 16.3.10
 */
export declare const RegExpVersion: RegExp;
/**
 * 视频(video)链接地址（视频格式可按需增删）
 *
 * @example
 * http://www.abc.com/video/wc.avi
 */
export declare const RegExpVideoUrlPath: RegExp;
/**
 * 图片(image)链接地址（图片格式可按需增删）
 *
 * @example
 * https://www.abc.com/logo.png,http://www.abc.com/logo.png
 */
export declare const RegExpImageUrlPath: RegExp;
/**
 * 24小时制时间（HH:mm:ss）
 *
 * @example
 * 23:34:55
 */
export declare const RegExp24Time: RegExp;
/**
 * 12小时制时间（hh:mm:ss）
 *
 * @example
 * 11:34:55
 */
export declare const RegExp12Time: RegExp;
/**
 * base64格式
 *
 * @example
 * data:image/gif;base64,xxxx==
 */
export declare const RegExpBase64: RegExp;
/**
 * 数字/货币金额（支持负数、千分位分隔符）
 *
 * @example
 * 100,-0.99,3,234.32,-1,900,235.09,12,345,678.90
 */
export declare const RegExpAmount: RegExp;
/**
 * 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
 *
 * @example
 * 0.99,8.99,666
 */
export declare const RegExpNumberAmount: RegExp;
/**
 * 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
 *
 * @example
 * 6234567890,6222026006705354000
 */
export declare const RegExpCardNumber: RegExp;
/**
 * 中文姓名
 *
 * @example
 * 葛二蛋,凯文·杜兰特,德克·维尔纳·诺维茨基
 */
export declare const RegExpCNName: RegExp;
/**
 * 英文姓名
 *
 * @example
 * James,Kevin Wayne Durant,Dirk Nowitzki
 */
export declare const RegExpENName: RegExp;
/**
 * 车牌号(新能源)
 *
 * @example
 * 京AD92035,甘G23459F,京AA92035
 */
export declare const RegExpNewEnergyNumberPlate: RegExp;
/**
 * 车牌号(非新能源)
 *
 * @example
 * 京A00599,黑D23908
 */
export declare const RegExpNumberPlate: RegExp;
/**
 * 车牌号(新能源+非新能源)
 *
 * @example
 * 京A12345D,京A00599,京AD92035,甘G23459F,京AA92035
 */
export declare const RegExpAllNumberPlate: RegExp;
/**
 * 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
 *
 * @example
 * 008618311006933,+8617888829981,19119255642
 */
export declare const RegExpMobilePhoneNumberStrict: RegExp;
/**
 * 手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 *
 * @example
 * 008618311006933,+8617888829981,19119255642
 */
export declare const RegExpMobilePhoneNunber: RegExp;
/**
 * 手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
 *
 * @example
 * 008618311006933,+8617888829981,19119255642
 */
export declare const RegExpMobilePhoneLoose: RegExp;
/**
 * date(日期)
 *
 * @example
 * 1990-12-12,1-1-1,0000-1-1
 */
export declare const RegExpRungDate: RegExp;
/**
 * 可以被moment转化成功的时间 YYYYMMDD HH:mm:ss
 *
 * @example
 * 2020/01/01 23:59:59,2020-01-01 00:00:00,20200101 11:11:11
 */
export declare const RegExpDate: RegExp;
/**
 * email(邮箱)
 *
 * @example
 * 90203918@qq.com,nbilly@126.com,汉字@qq.com
 */
export declare const RegExpEmail: RegExp;
/**
 * 座机(tel phone)电话(国内),如: 0341-86091234
 *
 * @example
 * 0936-4211235,89076543,010-12345678-1234
 */
export declare const RegExpTelPhone: RegExp;
/**
 * 身份证号(1代,15位数字)
 *
 * @example
 * 123456991010193
 */
export declare const RegExp1IdNumber: RegExp;
/**
 * 身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 *
 * @example
 * 12345619991205131x
 */
export declare const RegExp2IdNumber: RegExp;
/**
 * 身份证号, 支持1/2代(15位/18位数字)
 *
 * @example
 * 622223199912051311,12345619991205131x,123456991010193
 */
export declare const RegExpIdNumber: RegExp;
/**
 * 护照（包含香港、澳门）
 *
 * @example
 * s28233515,141234567,159203084,MA1234567,K25345719
 */
export declare const RegExpPassport: RegExp;
/**
 * 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
 *
 * @example
 * justin,justin1989,justin_666
 */
export declare const RegExpAccount: RegExp;
/**
 * 中文/汉字
 *
 * @example
 * 正则,前端
 */
export declare const RegExpCN: RegExp;
/**
 * 小数
 *
 * @example
 * 0.0,0.09
 */
export declare const RegExpDecimals: RegExp;
/**
 * 数字
 *
 * @example
 * 12345678
 */
export declare const RegExpNumber: RegExp;
/**
 * html标签(宽松匹配)
 *
 * @example
 * <div id="app"> 2333 </div>,<input type="text">,<br>
 */
export declare const RegExpHTMLDOM: RegExp;
/**
 * qq号格式正确
 *
 * @example
 * 903013545,9020304
 */
export declare const RegExpQQNumber: RegExp;
/**
 * 数字和字母组成
 *
 * @example
 * james666,haha233hi
 */
export declare const RegExpAlphanumeric: RegExp;
/**
 * 英文字母
 *
 * @example
 * Russel
 */
export declare const RegExpEnglishAlphabet: RegExp;
/**
 * 小写英文字母组成
 *
 * @example
 * russel
 */
export declare const RegExpLowercase: RegExp;
/**
 * 大写英文字母
 *
 * @example
 * ABC,KD
 */
export declare const RegExpCapital: RegExp;
/**
 * 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 *
 * @example
 * Kd@curry666
 */
export declare const RegExpPasswordStrength: RegExp;
/**
 * 用户名校验，4到16位（字母，数字，下划线，减号）
 *
 * @example
 * xiaohua_qq
 */
export declare const RegExpUserName: RegExp;
/**
 * ip-v4[:端口]
 *
 * @example
 * 172.16.0.0,172.16.0.0:8080,127.0.0.0,127.0.0.0:998
 */
export declare const RegExpIPV4: RegExp;
/**
 * ip-v6[:端口]
 *
 * @example
 * 2031:0000:130f:0000:0000:09c0:876a:130b,[2031:0000:130f:0000:0000:09c0:876a:130b]:8080
 */
export declare const RegExpIPV6: RegExp;
/**
 * 16进制颜色
 *
 * @example
 * #f00,#F90,#000,#fe9de8
 */
export declare const RegExpColor16: RegExp;
/**
 * 微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线
 *
 * @example
 * github666,kd_-666
 */
export declare const RegExpWXNumber: RegExp;
/**
 * 邮政编码(中国)
 *
 * @example
 * 734500,100101
 */
export declare const RegExpPostalCode: RegExp;
/**
 * 中文和数字
 *
 * @example
 * 哈哈哈,你好6啊
 */
export declare const RegExpChineseAndNumbers: RegExp;
/**
 * 不能包含字母
 *
 * @example
 * 你好6啊,@¥()！
 */
export declare const RegExpNotLetter: RegExp;
/**
 * java包名
 *
 * @example
 * com.bbb.name
 */
export declare const RegExpJavaPackageName: RegExp;
/**
 * mac地址
 *
 * @example
 * 38:f9:d3:4b:f5:51,00-0C-29-CA-E4-66
 */
export declare const RegExpMac: RegExp;
/**
 * 匹配连续重复的字符
 *
 * @example
 * 我我我,112233,11234
 */
export declare const RegExpContinuousCharacters: RegExp;
/**
 * 数字和英文字母组成，并且同时含有数字和英文字母
 *
 * @example
 * 我a我1我,a对1
 */
export declare const RegExpCharacter: RegExp;
/**
 * 香港身份证
 *
 * @example
 * K034169(1)
 */
export declare const RegExpHKIDCard: RegExp;
/**
 * 澳门身份证
 *
 * @example
 * 5686611(1)
 */
export declare const RegExpAMIDCard: RegExp;
/**
 * 台湾身份证
 *
 * @example
 * U193683453
 */
export declare const RegExpTWIDCard: RegExp;
/**
 * 大写字母，小写字母，数字，特殊符号 `@#$%^&*`~()-+=` 中任意3项密码
 *
 * @example
 * a1@,A1@,Aa@
 */
export declare const RegExpStrongPassword: RegExp;
/**
 * 正整数，不包含0
 *
 * @example
 * 1231
 */
export declare const RegExpPositiveInteger: RegExp;
/**
 * 负整数，不包含0
 *
 * @example
 * -1231
 */
export declare const RegExpNegativeInteger: RegExp;
/**
 * 整数
 *
 * @example
 * -1231,123
 */
export declare const RegExpInteger: RegExp;
/**
 * 浮点数
 *
 * @example
 * 1.5
 */
export declare const RegExpFloatingNumber: RegExp;
/**
 * email(支持中文邮箱)
 *
 * @example
 * 90203918@qq.com,nbilly@126.com,啦啦啦@126.com
 */
export declare const RegExpEmailLoose: RegExp;
