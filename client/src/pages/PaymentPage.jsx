import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/backend"; // ✅ use your api.js wrapper

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function PaymentPage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK. Check your internet connection.", {
        position: "top-center",
      });
      return;
    }

    try {
      // ✅ call your backend createPayment API
      const { data: order } = await api.post("/payment/create-payment-order", {
        amount,
        receipt: `receipt_${Date.now()}`,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // from your .env
        amount: order.amount,
        currency: order.currency,
        name: "Mess Management",
        description: "Mess Payment",
        order_id: order.id,
        handler: async function (response) {
          toast.success("✅ Payment Successful", { position: "top-center" });

          // ⚠️ if you want receipts, you need to implement /payment/receipt in backend
          // For now, just confirm payment
          console.log("Payment response:", response);
        },
        prefill: {
          name,
          email: "",
          contact: "",
        },
        theme: {
          color: "#0ea5e9",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error("❌ Payment failed", { position: "top-center" });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          💳 Mess Payment
        </h1>

        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Amount (INR)"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handlePayment}
          className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md text-lg font-semibold transition"
        >
          🚀 Pay Now
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PaymentPage;
