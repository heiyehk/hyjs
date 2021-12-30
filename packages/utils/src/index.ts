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
  let timer: NodeJS.Timeout | null = null;
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
 * uuid
 * @returns
 */
export const uuid = (): string => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
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
 * 过滤不需要的内容
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
 * 是否是IE
 * @returns
 */
export const ieIE = () => navigator.userAgent.toLowerCase().indexOf('trident') > -1;

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
 * 是否是pc端
 * @returns
 */
export const isPc = () => {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !!agents.filter((x) => navigator.userAgent.includes(x)).length;
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
  // 利用 setTimeout 实现假休眠，这种方式对于休眠时间把控可能并不准确，它受制于nodejs主线程的回调时机
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
  // 这个方式是使用的nodejs的C扩展，但是高版本的nodejs已经集成了这个功能，这种方式会阻塞主线程，造成整个应用的停顿。
  // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, time);
};
