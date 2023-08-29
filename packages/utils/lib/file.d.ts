/**
 * file转化base64
 * @param file 文件
 */
export declare const fileToBase64: (file: File) => Promise<string>;
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
export declare const convertBase64ToFile: (base64: string, type?: "file" | undefined, filename?: string | undefined) => Blob;
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
export declare const downloadFile: (data: Blob, type: string, filename?: string) => void;
/**
 * 图片压缩
 * @param file 图片文件
 * @param quality 压缩比率，0.8是正常，越小图片可能不清晰
 * @return 返回一个Promise类型的Blob文件
 */
export declare const compressImage: (file: File, quality?: number) => Promise<Blob>;
/**
 * 获取视频/音频时长
 * @param file
 * @returns 秒/s
 */
export declare const getAudioDuration: (file: File) => Promise<number>;
/**
 * 文件转buffer
 * @param file
 * @returns
 */
export declare const fileToBuffer: (file: File | Blob) => Promise<ArrayBuffer>;
