"use client"

import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const html5QrCode = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startScanner = async () => {
      try {
        html5QrCode.current = new Html5Qrcode("reader");
        
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
          const cameraId = devices[0].id;
          await html5QrCode.current.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }
            },
            (decodedText) => {
              onScan(decodedText);
              if (navigator.vibrate) {
                navigator.vibrate(200);
              }
            },
            (errorMessage) => {
              console.warn(errorMessage);
            }
          );
        } else {
          onError(new Error("No cameras found"));
        }
      } catch (err) {
        onError(err instanceof Error ? err : new Error('Failed to start scanner'));
      }
    };

    startScanner();

    return () => {
      if (html5QrCode.current?.isScanning) {
        html5QrCode.current.stop()
          .catch(error => console.error("Failed to stop scanner:", error));
      }
    };
  }, [onScan, onError]);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="qr-scanner-container">
      <div id="reader" className="w-full min-h-[300px] rounded-lg overflow-hidden" />
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
        }

        #reader video {
          width: 100% !important;
          height: 300px !important;
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
        #reader__header_message,
        select {
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