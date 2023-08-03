/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * 是否移动端
 * @returns
 * @example
 */
export const isMobile = () => {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return !!agents.filter((x) => navigator.userAgent.includes(x)).length;
};

/**
 * 获取当前设备 `iOS` | `Android` | `Web`
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
 * 是否IE
 * @returns
 */
export const ieIE = () => navigator.userAgent.toLowerCase().indexOf('trident') > -1;

/**
 * 获取当前微信环境
 * - `wx` 微信环境内
 * - `mini-wx` 小程序内
 * - `no-wx` 非微信
 * @returns
 */
export const getWxEnv = (): Promise<'wx' | 'mini-wx' | 'no-wx' | ''> => {
  const ua: string = navigator.userAgent.toLowerCase();
  const isWXWork = /wxwork/i.test(ua);
  if (!isWXWork && /micromessenger/i.test(ua)) {
    return new Promise((resolve) => {
      try {
        // @ts-ignore
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            resolve('mini-wx');
          } else {
            resolve('wx');
          }
        });
      } catch (error) {
        resolve('wx');
        console.error(error);
      }
    });
  } else {
    return Promise.resolve('no-wx');
  }
};
