"use client"

import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && scannerRef.current) {
        try {
          const result = await scannerRef.current.html5Qrcode.scanFile(file, true);
          onScan(result);
        } catch (error) {
          onError(error as Error);
        }
      }
    };
    input.click();
  };

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
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        videoConstraints: {
          facingMode: { exact: "environment" }
        }
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        onScan(decodedText);
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
      },
      (errorMessage) => {
        onError(new Error(errorMessage));
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScan, onError]);

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full" />
      <div className="flex justify-center mt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFileUpload}
          className="hover:bg-gray-100"
        >
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Upload from gallery</span>
        </Button>
      </div>
      <style jsx global>{`
        /* Hide unnecessary UI elements */
        #reader__dashboard_section_csr,
        #reader__dashboard_section_swaplink,
        #reader__dashboard_section_fileselection,
        #reader__camera_permission_button,
        #reader__camera_selection,
        #reader__status_span,
        #reader__scan_region_label,
        select:has(option[value="environment"]),
        #reader__dashboard_section_swaplink,
        #html5-qrcode-button-camera-stop,
        #html5-qrcode-button-camera-start {
          display: none !important;
        }

        /* Custom styling for the scanner */
        #reader {
          border: none !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          width: 100% !important;
        }

        #reader__scan_region {
          background: transparent !important;
          border: none !important;
        }

        #reader__scan_region video {
          border-radius: 8px !important;
        }

        /* Hide the default file input button */
        #reader__filescan_input {
          display: none !important;
        }

        /* Style the torch button if available */
        #reader__dashboard_section_torch button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          margin: 8px !important;
        }

        /* Custom container for the gallery button */
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