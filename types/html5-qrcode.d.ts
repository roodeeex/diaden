declare module 'html5-qrcode' {
  interface Html5QrcodeScannerConfig {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    videoConstraints?: {
      facingMode?: string | { exact: string };
    };
  }

  class Html5Qrcode {
    constructor(elementId: string);
    start(
      cameraId: string | { facingMode: string | { exact: string } },
      config: Html5QrcodeScannerConfig,
      onScanSuccess: (decodedText: string, decodedResult: any) => void,
      onScanError?: (errorMessage: string, error: Error) => void
    ): Promise<void>;
    stop(): Promise<void>;
    clear(): Promise<void>;
    isScanning: boolean;
  }

  class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: Html5QrcodeScannerConfig,
      verbose: boolean
    );
    render(
      onScanSuccess: (decodedText: string, decodedResult: any) => void,
      onScanError?: (errorMessage: string, error: Error) => void
    ): void;
    clear(): Promise<void>;
  }

  export { Html5Qrcode, Html5QrcodeScanner };
} 