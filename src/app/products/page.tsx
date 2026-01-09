import { Package } from 'lucide-react';

// Mock data (replace with DB fetch later)
const products = [
    { id: 1, name: 'Surgical Gown (Level 3)', category: 'Healthcare', description: 'Fluid repellant, breathable surgical gown for high-risk procedures.', image: '/placeholder.jpg' },
    { id: 2, name: 'Biodegradable Carry Bag', category: 'Eco Packaging', description: '100% compostable corn-starch based carry bags.', image: '/placeholder.jpg' },
    { id: 3, name: 'Industrial Safety Gloves', category: 'Industrial', description: 'Heavy duty nitrile gloves for chemical handling.', image: '/placeholder.jpg' },
    { id: 4, name: 'Medical Bed Sheet', category: 'Healthcare', description: 'Anti-bacterial cotton blend bed sheets for hospital wards.', image: '/placeholder.jpg' },
    { id: 5, name: 'Paper Food Container', category: 'Eco Packaging', description: 'Grease-resistant paper containers for food delivery.', image: '/placeholder.jpg' },
    { id: 6, name: 'Safety Vest', category: 'Industrial', description: 'High visibility reflective safety vest for construction sites.', image: '/placeholder.jpg' },
];

export default function ProductsPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-heading font-bold text-gray-900">Product Catalog</h1>
                    <p className="text-gray-500 mt-2">Browse our range of high-quality solutions. Log in to see wholesale pricing.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filters and Grid */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                                    <span className="text-gray-700">Healthcare Textiles</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                                    <span className="text-gray-700">Eco Packaging</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                                    <span className="text-gray-700">Industrial Supplies</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        <Package className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs font-semibold text-teal-600 mb-1 uppercase tracking-wide">{product.category}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                        <button className="w-full mt-2 px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 font-medium transition-colors">
                                            Contact for Pricing
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
