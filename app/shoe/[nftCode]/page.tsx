import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const shoes = [
  {
    name: "Nike Air Max 2090",
    nftCode: "NIKE-AM2090-001",
    description: "The Nike Air Max 2090 is a bold new take on the iconic Air Max 90.",
    imageUrl: "https://example.com/public.blob.vercel-storage.com/nike-air-max-2090-Gy2tPG1.png",
    brand: "Nike",
    releaseDate: "2023-01-15",
    authenticatedDate: "2023-02-01"
  },
  {
    name: "Adidas Ultraboost",
    nftCode: "ADID-UB-001",
    description: "The Adidas Ultraboost offers unparalleled comfort and style.",
    imageUrl: "https://example.com/public.blob.vercel-storage.com/adidas-ultraboost-Jk4vST3.png",
    brand: "Adidas",
    releaseDate: "2023-03-10",
    authenticatedDate: "2023-03-25"
  }
]

export default function ShoePage({ params }: { params: { nftCode: string } }) {
  const shoe = shoes.find(s => s.nftCode === params.nftCode)

  if (!shoe) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <Image
            src={shoe.imageUrl}
            alt={shoe.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{shoe.name}</h1>
          <p className="text-xl mb-4">NFT Code: {shoe.nftCode}</p>
          <p className="text-gray-600 mb-4">{shoe.description}</p>
          <p className="mb-2"><strong>Brand:</strong> {shoe.brand}</p>
          <p className="mb-2"><strong>Release Date:</strong> {shoe.releaseDate}</p>
          <p className="mb-4"><strong>Authenticated Date:</strong> {shoe.authenticatedDate}</p>
          <Button size="lg" onClick={() => alert('NFT transfer functionality coming soon!')}>
            Transfer NFT
          </Button>
        </div>
      </div>
    </main>
  )
}

