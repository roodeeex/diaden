import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Diaden</h1>
        <p className="text-xl text-gray-600">Choose your interface</p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/buyer">I&apos;m a Buyer</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Link href="/brand">I&apos;m a Brand</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
