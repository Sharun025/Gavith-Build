import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Building2 className="h-24 w-24 text-blue-600" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Gavith Build
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your construction operations with our comprehensive multi-tenant management system. 
            Track materials, vehicles, expenses, and more across all your sites.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Material Management</h3>
            <p className="text-gray-600">
              Track purchases, consumptions, and maintain real-time material balance across all sites.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Operations</h3>
            <p className="text-gray-600">
              Monitor vehicle allocation, diesel consumption, and rental costs with detailed logs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Tracking</h3>
            <p className="text-gray-600">
              Manage expenses by category, generate reports, and maintain financial transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
