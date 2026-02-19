const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const protect = require("../middleware/AuthMiddleware");

// ✅ CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    // console.log("USER:", req.user._id);
    // console.log("BODY:", req.body);

    const { items, address, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      address,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    // console.error("ORDER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ✅ USER ORDERS
router.get("/my-orders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// ✅ ADMIN ORDERS
router.get("/admin", protect, async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json(orders);
});

// ✅ UPDATE STATUS
router.put("/:id/status", protect, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: status },
    { new: true }
  );

  res.json(order);
});

module.exports = router;