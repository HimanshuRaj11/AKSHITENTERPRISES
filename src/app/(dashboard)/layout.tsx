import { auth } from '@/auth';
import Sidebar from '@/components/layout/Sidebar';
import { redirect } from 'next/navigation';
import { UserRole } from '@/lib/enums';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar role={session.user.role as UserRole} />
            <div className="flex-1 flex flex-col w-0 overflow-hidden">
                {/* Top Header - simplified */}
                <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        {session.user.role === 'ADMIN' && 'Admin Console'}
                        {session.user.role === 'AGENT' && 'Agent Portal'}
                        {session.user.role === 'PARTNER' && 'Partner Portal'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                            <p className="text-xs text-gray-500">{session.user.email}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                            {session.user.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>

                <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
