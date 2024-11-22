declare module 'html5-qrcode' {
  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: {
        fps?: number;
        qrbox?: { width: number; height: number } | number;
        videoConstraints?: {
          facingMode?: { exact: string } | string;
        };
      },
      verbose?: boolean
    );
    render(
      successCallback: (decodedText: string) => void,
      errorCallback: (errorMessage: string) => void
    ): void;
    clear(): Promise<void>;
  }
} 