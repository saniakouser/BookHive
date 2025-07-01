const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

//   try {
    // 🔹 MOCK RESPONSE INSTEAD OF CALLING Razorpay API
    // const mockOrder = {
    //   id: "order_mock_" + Date.now(),
    //   amount: amount * 100,
    //   currency: "INR",
    //   receipt: "receipt_mock_" + Date.now(),
    //   status: "created"
    // };

    // res.status(200).json(mockOrder);
  try {
    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create Razorpay order", error });
  }
};

module.exports = { createOrder };
