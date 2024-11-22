"use client"

import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { ImagePlus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        showTorchButtonIfSupported: true,
        formatsToSupport: [ 0x1 ], // QR Code only
      },
      false
    );

    const html5QrcodeScanner = scannerRef.current;
    html5QrcodeScanner.render(
      (decodedText: string) => {
        onScan(decodedText);
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
      },
      (errorMessage: string) => {
        onError(new Error(errorMessage));
      }
    );

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(console.error);
      }
    };
  }, [onScan, onError]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const imageData = e.target?.result as string;
          resolve(imageData);
        };
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(file);
      });

      // Process the image data
      if (scannerRef.current) {
        const decodedText = await scannerRef.current.html5Qrcode.scanFileV2(file);
        onScan(decodedText.decodedText);
      }
    } catch (error) {
      onError(error as Error);
    }
  };

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 bg-white/80 hover:bg-white shadow-md"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImagePlus className="h-4 w-4" />
        <span className="sr-only">Upload from gallery</span>
      </Button>
      <style jsx global>{`
        /* Hide unwanted elements */
        #reader__dashboard_section_csr,
        #reader__dashboard_section_swaplink,
        #reader__dashboard_section_fileselection,
        #reader__camera_selection,
        #reader__status_span,
        select#reader__camera_selection,
        span#reader__status_span,
        button#reader__dashboard_section_csr {
          display: none !important;
        }

        /* Custom styling for the scanner */
        #reader {
          border: none !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        #reader__scan_region {
          background: transparent !important;
          border: none !important;
        }

        #reader__scan_region video {
          border-radius: 8px !important;
        }

        #reader__dashboard {
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
        }

        /* Style the torch button if available */
        #reader__dashboard_section_torch button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          margin: 8px !important;
          position: absolute !important;
          bottom: 4px !important;
          left: 4px !important;
          z-index: 10 !important;
        }

        .qr-scanner-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
} 