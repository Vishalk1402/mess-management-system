import Razorpay from "razorpay";
import fs from "fs";
import PDFDocument from "pdfkit";

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});

export const createPaymentOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt: receipt || "receipt_order_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

export const generateReceipt = (req, res) => {
  const { name, amount, orderId } = req.body;

  const doc = new PDFDocument();
  const filename = `receipt_${orderId}.pdf`;
  const filepath = `./receipts/${filename}`;
  const writeStream = fs.createWriteStream(filepath);

  doc.pipe(writeStream);
  doc.fontSize(20).text("Payment Receipt", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Amount Paid: ₹${amount}`);
  doc.text(`Order ID: ${orderId}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);
  doc.end();

  writeStream.on("finish", () => {
    res.download(filepath, filename);
  });
};
