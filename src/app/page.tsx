import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck, Factory, HeartPulse } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Placeholder for Hero Image - would be replaced by actual image */}
          <div className="w-full h-full bg-gradient-to-r from-teal-900 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-6">
            Eco-friendly & <br className="hidden md:block" />
            <span className="text-teal-400">Industrial Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
            Leading the revolution in healthcare textiles and sustainable packaging.
            Quality manufacturing for a greener future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
            >
              Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-semibold rounded-lg transition-colors flex items-center justify-center"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* About / Mission Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">100% Sustainable</h3>
              <p className="text-gray-600">Committed to biodegradable and eco-friendly manufacturing processes.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">IS0 Certified Quality</h3>
              <p className="text-gray-600">Meeting international standards for healthcare and industrial safety.</p>
            </div>
            <div className="p-6">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-4">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Direct Manufacturing</h3>
              <p className="text-gray-600">From our factory to your facility, ensuring best wholesale rates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Core Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized solutions for hospitals, municipalities, and retail industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <HeartPulse className="h-20 w-20 text-blue-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Healthcare Textiles</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Surgical gowns, drapes, bed linens, and protective wear for hospitals.
                </p>
                <Link href="/products?category=healthcare" className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center">
                  View Catalog <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-green-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Leaf className="h-20 w-20 text-green-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Eco Packaging</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Biodegradable bags, food containers, and compostable packaging solutions.
                </p>
                <Link href="/products?category=eco" className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center">
                  View Catalog <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Truck className="h-20 w-20 text-slate-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Industrial Supplies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Safety gear, heavy-duty layout fabrics, and wholesale industrial materials.
                </p>
                <Link href="/products?category=industrial" className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center">
                  View Catalog <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to Partner with Akshit Enterprises?</h2>
          <p className="text-teal-100 mb-10 text-lg">
            Join our network of hospitals, distributors, and retailers. Get exclusive wholesale pricing and priority support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?type=partner"
              className="px-8 py-3 bg-white text-teal-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply as Partner
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 transition-colors border border-teal-500"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
