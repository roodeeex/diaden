"use client"

import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
  onInit?: () => void;
}

export function QRScanner({ onScan, onError, onInit }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Request camera permission immediately
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { exact: "environment" } // Force back camera
      }
    }).then(() => {
      // Initialize scanner after permission is granted
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          rememberLastUsedCamera: false, // Disable camera selection memory
          showTorchButtonIfSupported: true, // Show flash button if available
          defaultZoomValueIfSupported: 2,
        },
        false
      );

      // Start scanning automatically
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

      if (onInit) {
        onInit();
      }
    }).catch((error) => {
      console.error("Failed to get camera permission:", error);
      onError(new Error("Camera permission denied"));
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScan, onError, onInit]);

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full" />
      <style jsx>{`
        .qr-scanner-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        
        :global(#reader) {
          border: none !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        :global(#reader__scan_region) {
          background: transparent !important;
        }

        :global(#reader__dashboard) {
          padding: 8px !important;
          background: #f8f9fa !important;
        }

        :global(#reader__camera_selection) {
          display: none !important;
        }

        :global(#reader__status_span) {
          display: none !important;
        }

        :global(#reader__header_message) {
          display: none !important;
        }

        :global(#reader__dashboard_section_swaplink) {
          display: none !important;
        }

        :global(#reader__dashboard_section_csr) {
          display: none !important;
        }
      `}</style>
    </div>
  );
} 