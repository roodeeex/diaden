"use client"

import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Request camera permission first
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        if (typeof window === 'undefined' || scannerRef.current) return;

        // Initialize scanner after permission is granted
        scannerRef.current = new Html5QrcodeScanner(
          "reader",
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
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
            console.error(errorMessage);
            onError(new Error(errorMessage));
          }
        );
      })
      .catch((error) => {
        console.error("Camera permission error:", error);
        onError(new Error("Camera permission denied"));
      });

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
          .catch(error => console.error("Failed to clear scanner:", error));
        scannerRef.current = null;
      }
    };
  }, [onScan, onError]);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full min-h-[300px]" />
      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            alert("Gallery scanning coming soon!");
          }
        }}
      />
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
          onClick={handleFileInput}
        >
          <ImageIcon className="w-4 h-4" />
          Gallery
        </Button>
      </div>
      <style jsx global>{`
        #reader {
          border: none !important;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        #reader__scan_region {
          background: transparent !important;
          border: none !important;
          min-height: 300px !important;
        }

        #reader__scan_region video {
          max-width: 100% !important;
          min-height: 300px !important;
          object-fit: cover !important;
          border-radius: 8px !important;
        }

        /* Hide unnecessary elements */
        #reader__dashboard_section_csr,
        #reader__dashboard_section_swaplink,
        #reader__dashboard_section_fileselection,
        #reader__filescan_input,
        #reader__filescan_input_label,
        #reader__camera_selection,
        #reader__status_span,
        #reader__header_message {
          display: none !important;
        }

        #reader__dashboard {
          padding: 0 !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
} 