import { Leaf, Recycle, Sun, Droplets } from "lucide-react";

export default function SustainabilityPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="bg-green-800 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-700 rounded-full mb-6">
                        <Leaf className="h-8 w-8 text-green-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Commitment to the Planet</h1>
                    <p className="text-lg text-green-100 max-w-2xl mx-auto">
                        Incorporating eco-friendly practices in every step of our manufacturing and distribution.
                    </p>
                </div>
            </div>

            {/* Pillars of Sustainability */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-16">Green Manufacturing Pillars</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center p-6 border border-green-100 rounded-xl bg-green-50/50">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Recycle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Biodegradable</h3>
                        <p className="text-gray-600 font-sm">
                            Our packaging solutions break down naturally, reducing landfill waste.
                        </p>
                    </div>

                    <div className="text-center p-6 border border-green-100 rounded-xl bg-green-50/50">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Sun className="h-8 w-8 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Renewable Energy</h3>
                        <p className="text-gray-600 font-sm">
                            Our factories utilize solar power for 40% of energy needs.
                        </p>
                    </div>

                    <div className="text-center p-6 border border-green-100 rounded-xl bg-green-50/50">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Droplets className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Water Conservation</h3>
                        <p className="text-gray-600 font-sm">
                            Advanced recycling systems reduce water consumption by 60% in production.
                        </p>
                    </div>

                    <div className="text-center p-6 border border-green-100 rounded-xl bg-green-50/50">
                        <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Leaf className="h-8 w-8 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Non-Toxic Materials</h3>
                        <p className="text-gray-600 font-sm">
                            We assume strict policies against harmful chemical dyes and additives.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-4">
                            <div className="text-4xl font-bold text-teal-400 mb-2">50+</div>
                            <div className="text-sm text-gray-400">Partner Hospitals</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-teal-400 mb-2">10k+</div>
                            <div className="text-sm text-gray-400">Tons of Plastic Saved</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-teal-400 mb-2">100%</div>
                            <div className="text-sm text-gray-400">Made in India</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
