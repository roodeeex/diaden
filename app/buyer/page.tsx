"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, X } from 'lucide-react'
import { QrReader } from 'react-qr-reader'

export default function BuyerPage() {
  const [nftCode, setNftCode] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, we would validate the NFT code
    router.push(`/product/nike-air-jordan-1`)
  }

  const handleScan = (result: any) => {
    if (result) {
      setNftCode(result?.text)
      setShowScanner(false)
    }
  }

  const handleError = (error: any) => {
    console.error(error)
    alert("Error accessing camera: " + error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Scan Product</h1>
        
        {showScanner ? (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Scan QR Code</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowScanner(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative aspect-square w-full">
              <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={handleScan}
                onError={handleError}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="nft-code" className="block text-sm font-medium text-gray-700 mb-1">
                Enter NFT Code or Scan QR Code
              </label>
              <div className="flex">
                <Input
                  id="nft-code"
                  type="text"
                  value={nftCode}
                  onChange={(e) => setNftCode(e.target.value)}
                  placeholder="Enter NFT code"
                  className="pr-12 relative"
                  required
                />
                <Button
                  type="button"
                  size="icon"
                  className="absolute top-[70%] right-2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors bg-transparent hover:bg-transparent"
                  onClick={() => setShowScanner(true)}
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Scan QR code</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Verify Product
            </Button>
          </form>
        )}

        <div className="mt-4 text-center">
          <a
            href="/product/nike-air-jordan-1"
            className="text-blue-500 hover:text-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              router.push('/product/nike-air-jordan-1');
            }}
          >
            Test: View Nike Air Jordan 1
          </a>
        </div>
      </div>
    </div>
  )
}

