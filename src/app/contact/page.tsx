'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting Akshit Enterprises. We will get back to you shortly.');
        // Integrate API later
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions about our products or want to become a partner? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="bg-teal-700 text-white rounded-2xl p-8 lg:p-12 shadow-lg">
                        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <Mail className="h-6 w-6 mt-1 text-teal-300" />
                                <div>
                                    <p className="font-semibold">Email Us</p>
                                    <p className="text-teal-100">info@akshitenterprises.com</p>
                                    <p className="text-teal-100">sales@akshitenterprises.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="h-6 w-6 mt-1 text-teal-300" />
                                <div>
                                    <p className="font-semibold">Call Us</p>
                                    <p className="text-teal-100">+91 98765 43210</p>
                                    <p className="text-teal-100">Mon - Sat, 9am - 7pm</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="h-6 w-6 mt-1 text-teal-300" />
                                <div>
                                    <p className="font-semibold">Visit Us</p>
                                    <p className="text-teal-100">
                                        123 Industrial Area, Phase 2,<br />
                                        Okhla, New Delhi - 110020
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow"
                                        placeholder="+91 98..."
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow"
                                        placeholder="john@example.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow"
                                        value={formData.inquiryType}
                                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="wholesale">Wholesale / Bulk Order</option>
                                        <option value="partner">Become a Partner</option>
                                        <option value="agent">Join as Agent</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow resize-none"
                                    placeholder="How can we help you?"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center"
                            >
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
