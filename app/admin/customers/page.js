"use client";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/admin/customers");
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading Customers...</div>;

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#442D1C] mb-8">Customers</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#EDD8B4]/30 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#FDFBF7] text-[#8E5022] uppercase text-xs font-semibold">
            <tr>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Phone</th>
              <th className="p-4 border-b">Orders</th>
              <th className="p-4 border-b">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDD8B4]/20 text-[#442D1C]">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#FDFBF7]/50">
                <td className="p-4 font-medium">{customer.name || "Guest"}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone || "-"}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-[#EDD8B4]/30 rounded-full text-xs font-bold">
                    {customer._count?.orders || 0}
                  </span>
                </td>
                <td className="p-4 text-sm text-[#8E5022]">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {customers.length === 0 && (
          <div className="p-8 text-center text-[#8E5022]">No customers found yet.</div>
        )}
      </div>
    </div>
  );
}