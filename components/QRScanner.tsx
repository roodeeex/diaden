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

    // Configure scanner with back camera preference
    const config = {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250,
      },
      aspectRatio: 1.0
    };

    scannerRef.current = new Html5QrcodeScanner("reader", config, false);

    const html5QrcodeScanner = scannerRef.current;
    html5QrcodeScanner.render(
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

    // Request camera permission immediately
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: { 
          exact: "environment" 
        } 
      } 
    }).catch(() => {
      // Fallback to any available camera
      return navigator.mediaDevices.getUserMedia({ video: true });
    });

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(console.error);
      }
    };
  }, [onScan, onError]);

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full" />
      <style jsx global>{`
        #reader__dashboard_section_csr,
        #reader__dashboard_section_swaplink,
        #reader__dashboard_section_fileselection,
        #reader__camera_selection,
        #reader__status_span {
          display: none !important;
        }

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

        #reader__scan_region video {
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  );
} 