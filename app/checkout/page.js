"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { loadRazorpayScript } from "@/lib/razorpay";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart"; 
import { Truck, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const cart = useCart(); 

  // --- Form State ---
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    gst: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  // --- Cost Calculation Logic ---
  // Mock logic: Assume each item is 0.5kg. Rate: ₹100 for first kg, ₹50 per extra kg.
  const totalWeight = cart.items.length * 0.5; 
  const shippingCost = totalWeight <= 0 ? 0 : totalWeight <= 1 ? 100 : 100 + ((totalWeight - 1) * 50);
  
  // Cart Subtotal (Assuming cart.items has 'price' and 'quantity')
  const subtotal = cart.items.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
  const gstAmount = subtotal * 0.05; // Assuming 5% GST on ceramics
  const totalAmount = subtotal + gstAmount + shippingCost;

  useEffect(() => {
    if(user) {
        setFormData(prev => ({...prev, name: user.displayName, email: user.email}));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to continue");
      return;
    }

    setLoading(true);

    try {
      // 1. Sync User & Address to Database
      const syncRes = await fetch("/api/user/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: formData.name,
          phone: formData.phone,
          gstNumber: formData.gst,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }
        }),
      });

      if (!syncRes.ok) throw new Error("Failed to save address");

      // 2. Load Razorpay
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error("Razorpay SDK failed to load");

      // 3. Create Order
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const order = await res.json();
      if (!order.id) throw new Error("Order creation failed");

      // 4. Open Payment Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Bashō Ceramics",
        description: "Artisan Pottery Checkout",
        image: "/brand/logo-basho.png",
        order_id: order.id,
        handler: async function (response) {
          // Verify Payment
          const verifyRes = await fetch("/api/razorpay", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
             cart.removeAll(); // Clear cart
             router.push("/success"); 
          } else {
             alert("Payment verification failed!");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#C85428" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-8 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT COLUMN: Shipping Form --- */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-serif text-[#442D1C]">Checkout</h1>
            <div className="h-px flex-1 bg-[#EDD8B4]/50"></div>
          </div>

          <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
            {/* Contact Info */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-[#EDD8B4]/30">
              <h2 className="text-lg font-medium text-[#442D1C] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C85428]" /> Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                   <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">Email</label>
                   <input type="email" name="email" value={formData.email} disabled className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                   <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">Full Name</label>
                   <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428] transition-colors" />
                </div>
                <div>
                   <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">Phone Number</label>
                   <input required type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428] transition-colors" />
                </div>
              </div>
            </section>

            {/* Address Info */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-[#EDD8B4]/30">
              <h2 className="text-lg font-medium text-[#442D1C] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C85428]" /> Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                   <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">Street Address</label>
                   <input required type="text" name="street" placeholder="Flat / House No / Street" value={formData.street} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">Pincode</label>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428]" />
                  </div>
                </div>
                <div>
                   <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">State</label>
                   <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428]" />
                </div>
              </div>
            </section>

            {/* Optional GST */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-[#EDD8B4]/30">
              <h2 className="text-lg font-medium text-[#442D1C] mb-4">Tax Invoice (Optional)</h2>
              <div>
                 <label className="text-xs text-[#8E5022] font-semibold uppercase tracking-wider">GST Number</label>
                 <input type="text" name="gst" placeholder="GSTIN (Optional)" value={formData.gst} onChange={handleInputChange} className="w-full mt-1 p-3 bg-[#FDFBF7] border border-[#EDD8B4] rounded-lg focus:outline-none focus:border-[#C85428]" />
              </div>
            </section>
          </form>
        </div>

        {/* --- RIGHT COLUMN: Order Summary --- */}
        <div className="lg:col-span-5">
           <div className="sticky top-28 space-y-6">
             <div className="bg-[#442D1C] text-[#FDFBF7] p-6 rounded-xl shadow-xl">
               <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
               
               {/* Cart Items Preview */}
               <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                 {cart.items.map((item) => (
                   <div key={item.id} className="flex justify-between items-start text-sm">
                     <div className="text-[#EDD8B4] font-medium">
                       {item.name} <span className="text-white/50">x {item.quantity || 1}</span>
                     </div>
                     <div className="text-white">₹{item.price * (item.quantity || 1)}</div>
                   </div>
                 ))}
               </div>

               <div className="h-px bg-white/10 my-4"></div>

               {/* Cost Breakdown */}
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between text-[#EDD8B4]">
                   <span>Subtotal</span>
                   <span>₹{subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[#EDD8B4]">
                   <span>GST (5%)</span>
                   <span>₹{gstAmount.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[#EDD8B4]">
                   <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Shipping</span>
                   <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span>
                 </div>
               </div>

               <div className="h-px bg-white/20 my-6"></div>

               <div className="flex justify-between items-end mb-8">
                 <span className="text-lg font-medium text-[#EDD8B4]">Total to Pay</span>
                 <span className="text-3xl font-serif text-white">₹{totalAmount.toFixed(2)}</span>
               </div>

               <Button 
                 onClick={() => document.getElementById("checkout-form").requestSubmit()} 
                 disabled={loading || cart.items.length === 0}
                 className="w-full bg-[#C85428] hover:bg-[#A03D1A] text-white py-6 text-lg rounded-lg shadow-lg font-medium transition-all transform hover:scale-[1.02]"
               >
                 {loading ? "Processing Securely..." : `Pay ₹${totalAmount.toFixed(2)}`}
               </Button>

               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Secure SSL Encrypted Payment</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}