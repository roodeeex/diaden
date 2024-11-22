import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

const productData = {
  id: 'nike-air-jordan-1',
  name: 'Nike Air Jordan 1',
  seller: 'Nike',
  productionDate: '2023-03-01',
  nftId: 'NFT-AJ1-123456',
  imageUrl: 'https://cdn.dribbble.com/users/7087400/screenshots/17815910/media/1bd10fbe33ad42ba52eaf891335e3415.png',
  description: 'The Air Jordan 1, first released in 1985, is an iconic sneaker designed for Michael Jordan. This classic model features premium leather uppers, the Nike Swoosh, and Air cushioning in the sole. Its timeless design has made it a cultural phenomenon beyond basketball.'
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={productData.imageUrl}
              alt={productData.name}
              width={400}
              height={400}
              className="h-full w-full object-cover md:w-96"
            />
          </div>
          <div className="p-8">
            <CardHeader className="p-0">
              <CardDescription className="text-sm text-indigo-500 font-semibold">
                {productData.nftId}
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-bold text-gray-900">
                {productData.name}
              </CardTitle>
            </CardHeader>
            <div className="mt-2 mb-4">
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified by Daiden and Nike
              </div>
            </div>
            <CardContent className="p-0">
              <p className="mt-2 text-gray-600">Seller: {productData.seller}</p>
              <p className="mt-2 text-gray-600">Production Date: {productData.productionDate}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
                <p className="mt-2 text-gray-600">{productData.description}</p>
              </div>
              <div className="mt-6">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  View on XRP Ledger
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

