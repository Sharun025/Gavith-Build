'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Building2, 
  Package, 
  Truck, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Calendar,
  Users,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const userName = session?.user?.name || 'Demo User'

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sites</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2 this month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">6</p>
              <div className="flex items-center mt-2">
                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">75% completion</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
              <p className="text-3xl font-bold text-gray-900">₹125,000</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5% vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Materials</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <div className="flex items-center mt-2">
                <Package className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600">12 in stock</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="space-y-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Critical Stock Alert
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="mb-2">
                  1 material(s) have negative balance:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between items-center bg-red-100 px-3 py-2 rounded">
                    <span className="font-medium">Aggregate</span>
                    <span className="text-red-800 font-bold">-20 Cubic Meters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Low Stock Warning
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p className="mb-2">
                  1 material(s) are running low:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex justify-between items-center bg-yellow-100 px-3 py-2 rounded">
                    <span className="font-medium">Sand</span>
                    <span className="text-yellow-800 font-bold">20 Cubic Meters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Material Balance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Material Balance</h2>
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                <Eye className="h-4 w-4 mr-1" />
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Purchased
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Consumed
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Cement</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Bags</td>
                    <td className="py-4 px-4 text-sm text-gray-500">2,500</td>
                    <td className="py-4 px-4 text-sm text-gray-500">2,100</td>
                    <td className="py-4 px-4 text-sm font-medium text-green-600">400</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Good
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Steel</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Tons</td>
                    <td className="py-4 px-4 text-sm text-gray-500">120</td>
                    <td className="py-4 px-4 text-sm text-gray-500">95</td>
                    <td className="py-4 px-4 text-sm font-medium text-green-600">25</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Good
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Sand</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Cubic Meters</td>
                    <td className="py-4 px-4 text-sm text-gray-500">500</td>
                    <td className="py-4 px-4 text-sm text-gray-500">480</td>
                    <td className="py-4 px-4 text-sm font-medium text-yellow-600">20</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Warning
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">Aggregate</td>
                    <td className="py-4 px-4 text-sm text-gray-500">Cubic Meters</td>
                    <td className="py-4 px-4 text-sm text-gray-500">400</td>
                    <td className="py-4 px-4 text-sm text-gray-500">420</td>
                    <td className="py-4 px-4 text-sm font-medium text-red-600">-20</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Critical
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Cement purchase for Site A</p>
                  <p className="text-xs text-gray-500">Downtown Project • Materials</p>
                  <p className="text-xs text-gray-400">1/15/2024</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₹45,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Labor payment - Week 2</p>
                  <p className="text-xs text-gray-500">Residential Complex • Labor</p>
                  <p className="text-xs text-gray-400">1/14/2024</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₹32,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Equipment rental - Excavator</p>
                  <p className="text-xs text-gray-500">Commercial Building • Equipment</p>
                  <p className="text-xs text-gray-400">1/13/2024</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₹18,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Site Progress</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Downtown Project</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
                  Active
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicles:</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="font-medium">25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Work Entries:</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Residential Complex</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
                  Active
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicles:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Work Entries:</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Commercial Building</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full text-green-600 bg-green-100">
                  Active
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicles:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="font-medium">22</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Work Entries:</span>
                  <span className="font-medium">15</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Highway Bridge</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full text-yellow-600 bg-yellow-100">
                  On-Hold
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicles:</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expenses:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Work Entries:</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
