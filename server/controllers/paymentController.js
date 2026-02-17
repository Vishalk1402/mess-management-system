import Razorpay from "razorpay";
import PDFDocument from "pdfkit";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: receipt || "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

// STREAM PDF (no filesystem usage)
export const generateReceipt = (req, res) => {
  const { name, amount, orderId } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt_${orderId}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("Payment Receipt", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Amount Paid: ₹${amount}`);
  doc.text(`Order ID: ${orderId}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);

  doc.end();
};
