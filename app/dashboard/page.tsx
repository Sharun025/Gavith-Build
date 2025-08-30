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
  
  Activity,
  
  
  Eye,
  Download,
  Edit,
  Trash2,
  Search,
  Filter,
  
  MapPin
} from 'lucide-react'

interface Site {
  id: string
  name: string
  location: string
  progress: number
  status: 'active' | 'completed' | 'on-hold'
  startDate: string
  endDate: string
  budget: number
  spent: number
  manager: string
}

interface Material {
  id: string
  name: string
  unit: string
  purchased: number
  consumed: number
  balance: number
  status: 'good' | 'warning' | 'critical'
  lastUpdated: string
}

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  site: string
  approved: boolean
}

interface Vehicle {
  id: string
  name: string
  type: string
  site: string
  status: 'active' | 'maintenance' | 'idle'
  fuelConsumption: number
  lastService: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const userName = session?.user?.name || 'Demo User'

  // Mock data
  const [sites, _setSites] = useState<Site[]>([
    {
      id: '1',
      name: 'Downtown Project',
      location: 'Mumbai, Maharashtra',
      progress: 75,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 5000000,
      spent: 3750000,
      manager: 'Rajesh Kumar'
    },
    {
      id: '2',
      name: 'Residential Complex',
      location: 'Pune, Maharashtra',
      progress: 45,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-08-15',
      budget: 3000000,
      spent: 1350000,
      manager: 'Priya Sharma'
    },
    {
      id: '3',
      name: 'Commercial Building',
      location: 'Bangalore, Karnataka',
      progress: 90,
      status: 'active',
      startDate: '2023-11-01',
      endDate: '2024-03-31',
      budget: 8000000,
      spent: 7200000,
      manager: 'Amit Patel'
    }
  ])

  const [materials, _setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Cement',
      unit: 'Bags',
      purchased: 2500,
      consumed: 2100,
      balance: 400,
      status: 'good',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'Steel',
      unit: 'Tons',
      purchased: 120,
      consumed: 95,
      balance: 25,
      status: 'good',
      lastUpdated: '2024-01-19'
    },
    {
      id: '3',
      name: 'Sand',
      unit: 'Cubic Meters',
      purchased: 500,
      consumed: 480,
      balance: 20,
      status: 'warning',
      lastUpdated: '2024-01-18'
    },
    {
      id: '4',
      name: 'Aggregate',
      unit: 'Cubic Meters',
      purchased: 400,
      consumed: 420,
      balance: -20,
      status: 'critical',
      lastUpdated: '2024-01-17'
    }
  ])

  const [expenses, _setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Cement purchase for Downtown Project',
      amount: 450000,
      category: 'Materials',
      date: '2024-01-20',
      site: 'Downtown Project',
      approved: true
    },
    {
      id: '2',
      description: 'Labor payment - Week 2',
      amount: 320000,
      category: 'Labor',
      date: '2024-01-19',
      site: 'Residential Complex',
      approved: true
    },
    {
      id: '3',
      description: 'Equipment rental - Excavator',
      amount: 180000,
      category: 'Equipment',
      date: '2024-01-18',
      site: 'Commercial Building',
      approved: false
    }
  ])

  const [vehicles, _setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Excavator JCB-01',
      type: 'Excavator',
      site: 'Downtown Project',
      status: 'active',
      fuelConsumption: 25,
      lastService: '2024-01-15'
    },
    {
      id: '2',
      name: 'Crane Truck-02',
      type: 'Crane',
      site: 'Residential Complex',
      status: 'active',
      fuelConsumption: 30,
      lastService: '2024-01-10'
    },
    {
      id: '3',
      name: 'Bulldozer BD-03',
      type: 'Bulldozer',
      site: 'Commercial Building',
      status: 'maintenance',
      fuelConsumption: 35,
      lastService: '2024-01-05'
    }
  ])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const totalBudget = sites.reduce((sum, site) => sum + site.budget, 0)
  const totalSpent = sites.reduce((sum, site) => sum + site.spent, 0)
  const _totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const criticalMaterials = materials.filter(m => m.status === 'critical')
  const warningMaterials = materials.filter(m => m.status === 'warning')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      case 'on-hold': return 'text-yellow-600 bg-yellow-100'
      case 'maintenance': return 'text-orange-600 bg-orange-100'
      case 'idle': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMaterialStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button 
                onClick={() => {
                  setModalType('site')
                  setShowAddSiteForm(true)
                }}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Site
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sites</p>
                <p className="text-3xl font-bold text-gray-900">{sites.length}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+1 this month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-3xl font-bold text-gray-900">₹{(totalBudget / 100000).toFixed(1)}L</p>
                <div className="flex items-center mt-2">
                  <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">₹{(totalSpent / 100000).toFixed(1)}L spent</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{vehicles.filter(v => v.status === 'active').length}</p>
                <div className="flex items-center mt-2">
                  <Truck className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Total: {vehicles.length}</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Materials</p>
                <p className="text-3xl font-bold text-gray-900">{materials.length}</p>
                <div className="flex items-center mt-2">
                  <Package className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">{criticalMaterials.length} critical</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(criticalMaterials.length > 0 || warningMaterials.length > 0) && (
          <div className="mb-8 space-y-3">
            {criticalMaterials.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Critical Stock Alert</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p className="mb-2">{criticalMaterials.length} material(s) have negative balance:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {criticalMaterials.map((item) => (
                          <div key={item.id} className="flex justify-between items-center bg-red-100 px-3 py-2 rounded">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-red-800 font-bold">{item.balance} {item.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {warningMaterials.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Low Stock Warning</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p className="mb-2">{warningMaterials.length} material(s) are running low:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {warningMaterials.map((item) => (
                          <div key={item.id} className="flex justify-between items-center bg-yellow-100 px-3 py-2 rounded">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-yellow-800 font-bold">{item.balance} {item.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Activity },
                { id: 'sites', name: 'Sites', icon: Building2 },
                { id: 'materials', name: 'Materials', icon: Package },
                { id: 'expenses', name: 'Expenses', icon: DollarSign },
                { id: 'vehicles', name: 'Vehicles', icon: Truck }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sites Progress */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sites Progress</h3>
                    <div className="space-y-4">
                      {sites.map((site) => (
                        <div key={site.id} className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{site.name}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(site.status)}`}>
                              {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                            </span>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{site.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${site.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Manager: {site.manager}</p>
                            <p>Budget: ₹{(site.budget / 100000).toFixed(1)}L | Spent: ₹{(site.spent / 100000).toFixed(1)}L</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Expenses */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
                    <div className="space-y-3">
                      {expenses.slice(0, 5).map((expense) => (
                        <div key={expense.id} className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{expense.description}</p>
                              <p className="text-sm text-gray-600">{expense.site} • {expense.category}</p>
                              <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                expense.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {expense.approved ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sites Tab */}
            {activeTab === 'sites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search sites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setModalType('site')
                      setShowAddSiteForm(true)
                    }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Site
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sites.map((site) => (
                        <tr key={site.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{site.name}</div>
                              <div className="text-sm text-gray-500">{site.startDate} - {site.endDate}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{site.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${site.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{site.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(site.status)}`}>
                              {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{(site.budget / 100000).toFixed(1)}L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{site.manager}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setModalType('material')
                      setShowAddSiteForm(true)
                    }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchased</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {materials.map((material) => (
                        <tr key={material.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.unit}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.purchased.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.consumed.toLocaleString()}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getMaterialStatusColor(material.status)}`}>
                            {material.balance.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              material.status === 'good' ? 'bg-green-100 text-green-800' :
                              material.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Expenses Tab */}
            {activeTab === 'expenses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setModalType('expense')
                      setShowAddSiteForm(true)
                    }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.site}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{expense.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              expense.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {expense.approved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setModalType('vehicle')
                      setShowAddSiteForm(true)
                    }}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel (L/day)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.site}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.fuelConsumption}L</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(vehicle.lastService).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
    </div>
  )
}
