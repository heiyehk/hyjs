/**
 * file转化base64
 * @param file 文件
 */
export const fileToBase64 = (file: File): Promise<string> => {
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
 * @param base64 base64
 * @param type 类型`file`，`blob`
 * @param filename 如果选了`file`必须使用`filename`
 * @example
 * ``` ts
 * await convertBase64ToFile(base64, 'file', 'filename');
   // Promise<File>

   await convertBase64ToFile(base64, 'blob', 'filename');
   // Promise<Blob>
    ```
 */
export const convertBase64ToFile = (base64: string, type?: 'file', filename?: string) => {
  const arr = base64.split(',');
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
 * @example
 * ``` ts
 * downloadFile(data, 'image/jpeg', 'filename');
   // filename.jpeg
   ```
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
  const base64 = await fileToBase64(file);
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

/**
 * 获取视频/音频时长
 * @param file
 * @returns 秒/s
 */
export const getAudioDuration = (file: File): Promise<number> => {
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
 * 文件转buffer
 * @param file
 * @returns
 */
export const fileToBuffer = async (file: File | Blob): Promise<ArrayBuffer> => {
  return new Promise((resolve) => {
    const fr = new FileReader();

    fr.readAsArrayBuffer(file);
    fr.onloadend = () => resolve(fr.result as ArrayBuffer);
  });
};
