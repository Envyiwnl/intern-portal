import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Profile API
router.get("/profile", async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });

  const [{ total = 0 }] = await User.aggregate([
    { $group: { _id: null, total: { $sum: '$totalDonations' } } }
  ]);

  res.json({
    name: user.name,
    referralCode: user.referralCode,
    totalDonations: total, //accumulates total amount raised
  });
});

// Leaderboard API
router.get("/leaderboard", async (req, res) => {
  const users = await User.find()
    .select("name totalDonations")
    .sort({ totalDonations: -1 })
    .limit(10);

  const leaderboard = users.map((u) => ({
    name: u.name,
    raised: u.totalDonations,
  }));

  res.json(leaderboard);
});

// Donate API
router.post("/donate", async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ msg: "Donation must be a positive number" });
  }

  const user = await User.findByIdAndUpdate(
    req.user,
    { $inc: { totalDonations: amount } },
    { new: true }
  ).select("name referralCode totalDonations");
  if (!user) return res.status(404).json({ msg: "User not found" });

  const users = await User.find()
    .select("name totalDonations")
    .sort({ totalDonations: -1 })
    .limit(10);

  const leaderboard = users.map((u) => ({
    name: u.name,
    raised: u.totalDonations,
  }));

  res.json({
    profile: {
      name: user.name,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations,
    },
    leaderboard,
  });
});

const internData = {
  name: "Parvez Mussarf Hussain",
  referralCode: "Parvez2025",
  totalDonations: 12500,
};

router.get("/profile", (req, res) => {
  res.json(internData);
});

router.get("/leaderboard", (req, res) => {
  res.json([
    { name: "Alice", raised: 20000 },
    { name: "Bob", raised: 18000 },
    { name: "You", raised: internData.totalDonations },
  ]);
});

export default router;
