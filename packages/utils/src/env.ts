/**
 * 是否pc端
 * @returns
 * @example
 */
export const isPC = () => {
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
