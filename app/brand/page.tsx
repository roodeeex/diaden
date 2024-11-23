import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BrandLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Authenticate Your Brand&apos;s Sneakers with NFTs</h1>
            <p className="text-xl mb-8 text-gray-700">Our platform leverages NFTs on the XRP Ledger to provide a secure and transparent way for your brand to verify the authenticity of your sneakers. Protect your brand and empower your customers with blockchain technology.</p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/brand/register">Register Your Brand</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Link href="/brand/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="https://cdn.dribbble.com/users/7087400/screenshots/17815910/media/1bd10fbe33ad42ba52eaf891335e3415.png"
              alt="Brand Authentication Concept"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600">1. Cutting-edge Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Leverage the power of NFTs and the XRP Ledger to create tamper-proof digital certificates for your sneakers, ensuring unparalleled authenticity.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600">2. Enhanced Brand Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Safeguard your brand&apos;s reputation by providing a foolproof method for customers to verify the authenticity of their purchases, combating counterfeits effectively.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600">3. Data-Driven Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Gain valuable market insights through our analytics dashboard, tracking product lifecycle, customer behavior, and secondary market trends.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to revolutionize your brand&apos;s authenticity?</h2>
          <p className="text-xl mb-8 text-gray-700">Join the leading sneaker brands in embracing the future of product authentication.</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/brand/register">Get Started Today</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}

