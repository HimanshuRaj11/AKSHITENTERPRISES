import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Akshit Enterprises</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Innovating for a better tomorrow through sustainable industrial solutions and high-quality healthcare products.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="prose prose-lg text-gray-600">
                            <p className="mb-4">
                                Founded with a vision to bridge the gap between industrial efficiency and environmental responsibility,
                                Akshit Enterprises has grown into a trusted name in manufacturing and distribution.
                            </p>
                            <p className="mb-4">
                                We started as a small unit supplying essential textiles to local hospitals. Today, we are a major partner
                                for healthcare institutions, retail chains, and municipal corporations across the region.
                            </p>
                            <p>
                                Our commitment to quality is unwavering. Every product that leaves our facility undergoes rigorous
                                testing to ensure it meets international safety and durability standards.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                        {/* Placeholder for About Image */}
                        <span className="text-gray-400 font-medium">Company/Factory Image</span>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-teal-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-100">
                            <h3 className="text-2xl font-bold text-teal-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide high-quality, cost-effective, and sustainable products that enhance safety in healthcare
                                and efficiency in industries, while minimizing our environmental footprint.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-100">
                            <h3 className="text-2xl font-bold text-teal-800 mb-4">Our Vision</h3>
                            <p className="text-gray-600">
                                To be the leading partner for sustainable industrial and medical supplies in India, known for
                                reliability, innovation, and ethical business practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 text-center mb-12">Why We Are Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        "Eco-Conscious Manufacturing",
                        "Strict Quality Control",
                        "Transparent Pricing",
                        "Timely Delivery",
                        "Customer-Centric Approach",
                        "Innovation Driven"
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-teal-500 flex-shrink-0" />
                            <span className="text-gray-800 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
