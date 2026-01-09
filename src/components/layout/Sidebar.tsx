'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    LayoutDashboard,
    Package,
    Users,
    UserCheck,
    ShoppingCart,
    FileText,
    BarChart,
    LogOut
} from 'lucide-react';
import { UserRole } from '@/lib/enums';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    role?: UserRole;
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const getLinks = (role?: UserRole) => {
        switch (role) {
            case UserRole.ADMIN:
                return [
                    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
                    { name: 'Products', href: '/admin/products', icon: Package },
                    { name: 'Partners', href: '/admin/partners', icon: Users },
                    { name: 'Agents', href: '/admin/agents', icon: UserCheck },
                    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
                    { name: 'Reports', href: '/admin/reports', icon: BarChart },
                ];
            case UserRole.AGENT:
                return [
                    { name: 'Dashboard', href: '/agent', icon: LayoutDashboard },
                    { name: 'My Partners', href: '/agent/partners', icon: Users },
                    { name: 'Orders', href: '/agent/orders', icon: ShoppingCart },
                ];
            case UserRole.PARTNER:
                return [
                    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
                    { name: 'Catalog', href: '/portal/catalog', icon: Package },
                    { name: 'My Orders', href: '/portal/orders', icon: ShoppingCart },
                    { name: 'Invoices', href: '/portal/invoices', icon: FileText },
                ];
            default:
                return [];
        }
    };

    const links = getLinks(role);

    return (
        <div className="flex flex-col w-64 bg-slate-900 text-white h-full">
            <div className="flex items-center justify-center h-16 bg-slate-800 shadow-md">
                <span className="text-xl font-bold font-heading">Akshit<span className="text-teal-400">Portal</span></span>
            </div>
            <div className="flex-1 flex flex-col py-6 overflow-y-auto">
                <nav className="px-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                )}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
