import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AKSHIT ENTERPRISES</h3>
                        <p className="text-gray-400 text-sm">
                            Providing eco-friendly industrial solutions and healthcare textiles needed for a sustainable future.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-teal-400">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-teal-400">Products</Link></li>
                            <li><Link href="/sustainability" className="hover:text-teal-400">Sustainability</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-400">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                <span>info@akshitenterprises.com</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>+91 12345 67890</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>New Delhi, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Akshit Enterprises. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
