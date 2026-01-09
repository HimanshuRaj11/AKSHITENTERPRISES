import { Package, Users, UserCheck, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    // Mock Stats - In real app, fetch these server-side
    const stats = [
        { name: 'Total Revenue', value: '₹12,45,000', icon: DollarSign, color: 'bg-green-500' },
        { name: 'Active Orders', value: '24', icon: ShoppingCart, color: 'bg-blue-500' },
        { name: 'Partners', value: '58', icon: Users, color: 'bg-purple-500' },
        { name: 'Agents', value: '12', icon: UserCheck, color: 'bg-orange-500' },
        { name: 'Products', value: '145', icon: Package, color: 'bg-teal-500' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 flex items-center">
                            <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color} text-white mr-4`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[1, 2, 3].map((i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#ORD-00{i}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apollo Hospital</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Approved
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹45,000</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-right">
                        <button className="text-sm text-teal-600 font-medium hover:text-teal-700">View All Orders &rarr;</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
                    <ul className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <li key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                        <Package className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Surgical Gown Type {i}</p>
                                        <p className="text-xs text-gray-500">Healthcare Textiles</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">1,20{i} Units</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
