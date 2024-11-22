"use client"

import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

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
        hideSelectScanType: true,
        rememberLastUsedCamera: true,
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
      <style jsx global>{`
        /* Hide unnecessary UI elements */
        #reader__dashboard_section_csr {
          display: none !important;
        }
        
        #reader__dashboard_section_swaplink {
          display: none !important;
        }
        
        #reader__dashboard_section_fileselection {
          display: none !important;
        }

        /* Custom styling for the scanner */
        #reader {
          border: none !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        #reader__scan_region {
          background: transparent !important;
          border: none !important;
        }

        #reader__scan_region > img {
          display: none !important;
        }

        #reader__camera_selection {
          display: none !important;
        }

        #reader__status_span {
          display: none !important;
        }

        #reader__dashboard {
          padding: 0 !important;
          border: none !important;
        }

        /* Customize the scanning region */
        #reader__scan_region video {
          border-radius: 8px !important;
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
      `}</style>
    </div>
  );
} 