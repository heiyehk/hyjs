type FunctionalControl = (this: any, fn: any, delay?: number) => (...args: any) => void;
type DebounceEvent = FunctionalControl;
type ThrottleEvent = FunctionalControl;

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export const debounce: DebounceEvent = function (fn, delay = 1000) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns
 */
export const throttle: ThrottleEvent = function (fn, delay = 500) {
  let flag = true;
  return (...args: any) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

/**
 * 生成随机4位数code
 * @returns
 */
export const randomCode = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

/**
 * 生成uuid
 * @returns
 */
export const uuid = (): string => {
  return (
    randomCode() +
    randomCode() +
    '-' +
    randomCode() +
    '-' +
    randomCode() +
    '-' +
    randomCode() +
    '-' +
    randomCode() +
    randomCode() +
    randomCode()
  );
};

/**
 * file转化base64
 * @param file 文件
 */
export const fileReaderToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (res: ProgressEvent<FileReader>) => {
      resolve((res.currentTarget as FileReader).result as string);
    };
    reader.onerror = (e) => reject(e);
  });
};

/**
 * base64转文件格式
 * @param urlData base64
 * @param type 类型`file`，`blob`
 * @param filename 如果选了`file`必须使用`filename`
 */
export const convertBase64UrlToBlob = (urlData: string, type?: 'file', filename?: string) => {
  const arr = urlData.split(',');
  const mime = (arr[0].match(/:(.*?);/) as string[])[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type === 'file' && filename) {
    return new File([u8arr], filename, { type: mime });
  }
  return new Blob([u8arr], {
    type: mime
  });
};

/**
 * 流文件下载
 * @param data 流
 * @param type 类型，比如`application/json;charset=UTF-8`，`image/jpeg`
 * @param filename 文件名
 */
export const downloadFile = (data: Blob, type: string, filename = 'download') => {
  const blob = new Blob([data], { type });
  const objectUrl = URL.createObjectURL(blob);
  let elA: HTMLAnchorElement | null = document.createElement('a');
  elA.href = objectUrl;
  elA.download = filename;
  // elA.click();
  // 下面这个写法兼容火狐
  elA.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  elA = null;
  window.URL.revokeObjectURL(objectUrl);
};

/**
 * 图片压缩
 * @param file 图片文件
 * @param quality 压缩比率，0.8是正常，越小图片可能不清晰
 * @return 返回一个Promise类型的Blob文件
 */
export const compressImage = async (file: File, quality = 0.8): Promise<Blob> => {
  const base64 = await fileReaderToBase64(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = (e) => {
      console.log(e);
      const imageTarget = (e as any).path[0];
      const { width, height } = imageTarget;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context?.clearRect(0, 0, width, height);
      context?.drawImage(imageTarget, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        'image/jpeg',
        quality
      );
      return;
    };

    image.onerror = (e) => reject(e);
  });
};

type AccessType =
  | 'String'
  | 'Object'
  | 'Number'
  | 'Boolean'
  | 'Symbol'
  | 'Undefined'
  | 'Null'
  | 'Function'
  | 'Date'
  | 'Array'
  | 'RegExp'
  | 'Error'
  | 'HTMLDocument'
  | 'global';

/**
 * 类型获取
 * @param access 参数
 */
export const getAccessType = (access: any): AccessType => {
  return Object.prototype.toString.call(access).slice(8, -1) as AccessType;
};

/**
 * 过滤对象内容，如`null`、`undefined`等
 * @param data 数据
 * @param validation 过滤值
 */
export const filterParamsEmpty = <T extends Record<string, any>>(
  data: T,
  validation?: (null | undefined | '' | number)[]
): T => {
  const newObj: { [key: string]: any } = {};
  for (const key of Object.keys(data)) {
    if (!validation) {
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        newObj[key] = data[key];
      }
    } else {
      if (!validation.includes(data[key])) {
        newObj[key] = data[key];
      }
    }
  }
  return newObj as T;
};

/**
 * 获取视频时长
 * @param file
 * @returns
 */
export const getVideoDuration = (file: File) => {
  return new Promise((resolve) => {
    const fileurl = URL.createObjectURL(file);
    const audioElement: HTMLAudioElement = new Audio(fileurl);
    let eventListener: any;
    // eslint-disable-next-line prefer-const
    eventListener = audioElement.addEventListener('loadedmetadata', () => {
      resolve(audioElement.duration);
      audioElement.removeEventListener('loadedmetadata', eventListener);
    });
  });
};

/**
 * 下划线转驼峰
 * @param name
 * @returns
 */
export const toHump = (name: string) => {
  return name.replace(/_(\w)/g, (_: string, letter: string) => {
    return letter.toUpperCase();
  });
};

/**
 * 驼峰转换下划线
 * @param name
 * @returns
 */
export const toLine = (name: string) => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * 休眠
 * @param time
 * @returns
 */
export const sleep = (time = 0) => {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
};

/**
 * 是否是IE
 * @returns
 */
export const ieIE = () => navigator.userAgent.toLowerCase().indexOf('trident') > -1;

/**
 * 是否是pc端
 * @returns
 */
export const isPC = () => {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !!agents.filter((x) => navigator.userAgent.includes(x)).length;
};

/**
 * 获取当前设备
 * @returns
 */
export const getDevice = () => {
  // 判断是android还是ios还是web
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/iPhone\sOS/i)?.includes('iphone os') || ua.match(/iPad/i)?.includes('ipad')) {
    return 'iOS';
  }
  if (ua.match(/Android/i)?.includes('android')) return 'Android';
  return 'Web';
};

/**
 * 随机数字
 * @param min
 * @default 0
 * @param max
 * @returns
 */
export const randomNumber = (min = 0, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 阿拉伯数字翻译成中文的大写数字
 * @param num
 * @returns
 */
export const numberToChinese = (num: number | string) => {
  const digital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const unit = ['', '十', '百', '仟', '萬', '億', '点', ''];
  const splitNumber = String(num).replace(/(^0*)/g, '').split('.');
  let index = 0;
  let chineseNumber = '';
  let len = splitNumber[0].length - 1;
  for (; len >= 0; len--) {
    switch (index) {
      case 0:
        chineseNumber = unit[7] + chineseNumber;
        break;
      case 4:
        if (!new RegExp('0{4}//d{' + (splitNumber[0].length - len - 1) + '}$').test(splitNumber[0]))
          chineseNumber = unit[4] + chineseNumber;
        break;
      case 8:
        chineseNumber = unit[5] + chineseNumber;
        unit[7] = unit[5];
        index = 0;
        break;
    }
    if (
      index % 4 === 2 &&
      splitNumber[0].charAt(len + 2) !== '0' &&
      splitNumber[0].charAt(len + 1) == '0'
    )
      chineseNumber = digital[0] + chineseNumber;
    if (splitNumber[0].charAt(len) !== '0')
      chineseNumber = digital[Number(splitNumber[0].charAt(len))] + unit[index % 4] + chineseNumber;
    index++;
  }

  if (splitNumber.length > 1) {
    // 加上小数部分(如果有小数部分)
    chineseNumber += unit[6];
    for (let i = 0; i < splitNumber[1].length; i++)
      chineseNumber += digital[Number(splitNumber[1].charAt(i))];
  }
  if (chineseNumber === '一十') chineseNumber = '十';
  if (chineseNumber.match(/^一/) && chineseNumber.length === 3)
    chineseNumber = chineseNumber.replace('一', '');
  return chineseNumber;
};

/**
 * 数字转大写金额
 * @param num
 * @returns
 */
export const convertCurrency = (money: number | string) => {
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟'];
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆'];
  // 对应小数部分单位
  const cnDecUnits = ['角', '分', '毫', '厘'];
  // 整数金额时后面跟的字符
  const cnInteger = '整';
  // 整型完以后的单位
  const cnIntLast = '元';
  // 最大处理的数字
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  if (!money) return '';
  money = parseFloat(money as string);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
};
