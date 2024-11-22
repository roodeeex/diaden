import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="mb-8">
          <Image
            src="/img/logo.png"
            alt="DIADEN Logo"
            width={200}
            height={100}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to DIADEN</h2>
        <p className="mb-8">Are you a brand or a buyer?</p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/brand">I&apos;m a Brand</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/buyer">I&apos;m a Buyer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
