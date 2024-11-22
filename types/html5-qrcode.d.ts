declare module 'html5-qrcode' {
  interface Html5QrcodeScannerConfig {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    facingMode?: string;
  }

  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: Html5QrcodeScannerConfig,
      verbose: boolean
    );
    render(
      successCallback: (decodedText: string, decodedResult?: any) => void,
      errorCallback?: (errorMessage: string, error?: Error) => void
    ): void;
    clear(): Promise<void>;
  }
} 