"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login with a return address
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-[#442D1C] bg-[#FDFBF7]">Loading Admin...</div>;
  if (!user) return null; 

  return (
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#442D1C] text-[#EDD8B4] transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
        <div className="p-6 border-b border-[#EDD8B4]/20">
          <h1 className="font-serif text-2xl text-white">Bashō Admin</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <ShoppingBag className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-[#EDD8B4]/20">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-900/50 text-red-200 transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}