declare module 'html5-qrcode' {
  export class Html5QrcodeScanner {
    constructor(
      elementId: string,
      config: {
        qrbox?: { width: number; height: number } | number;
        fps?: number;
      },
      verbose?: boolean
    );
    render(
      successCallback: (decodedText: string, decodedResult?: any) => void,
      errorCallback?: (errorMessage: string, error?: Error) => void
    ): void;
    clear(): Promise<void>;
  }
} 