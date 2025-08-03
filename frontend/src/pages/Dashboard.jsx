import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

export default function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [donationAmount, setDonationAmount] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get("/intern/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      });

    axios
      .get("/intern/leaderboard")
      .then((res) => setLeaderboardData(res.data))
      .catch(console.error);
  }, [navigate]);

  if (!profile) return <p className="p-6">Loading…</p>;

  const handleDonate = async () => {
    setError("");
    const amt = parseFloat(donationAmount);
    if (isNaN(amt) || amt <= 0) {
      setError("Please enter a positive donation amount.");
      return;
    }

    try {
      const res = await axios.post("/intern/donate", { amount: amt });
      setProfile(res.data.profile);
      setLeaderboardData(res.data.leaderboard);
      setDonatedAmount(amt);
      setDonationAmount("");
      setShowModal(true);
    } catch (e) {
      setError(e.response?.data?.msg || "Donation failed.");
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 bg-[url('/public/dashboard.jpg')]
        bg-center
        bg-cover">
      <div className="relative flex items-center w-full p-6">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl bg-purple-300/30 p-2 rounded-full text-white shadow-xl backdrop-blur-md">Welcome, {profile.name}!</h1>
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center space-x-1 text-white hover:text-gray-500"
        >
          <FiLogOut className="text-3xl" />
        </button>
      </div>

      <div className="p-4 bg-gray-50/30 rounded-xl shadow-xl drop-shadow-md space-y-2 max-w-sm mx-auto backdrop-blur-md">
        <h2 className="text-xl">Make a Donation</h2>
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Amount (₹)"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full p-2 border rounded shadow-xl drop-shadow-md"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          onClick={handleDonate}
          className="mt-2 w-full py-2 bg-purple-600 text-white rounded hover:bg-green-700 shadow-xl drop-shadow-md opacity-80"
        >
          Donate
        </button>
      </div>

      <div className="space-y-2 text-center text-white">
        <p>
          <strong>Referral Code:</strong><span className="text-yellow-400 font-bold"> {profile.referralCode}</span>
        </p>
        <p>
          <strong>Total Donations Raised:</strong><span className="text-green-600 font-bold"> ₹{profile.totalDonations}</span>
        </p>
      </div>

      <div className="flex items-center justify-center opacity-80">
        <section className="p-4 bg-gray-50 rounded-xl shadow-xl w-[400px] bg-yellow-50/30 backdrop-blur-md">
          <h2 className="text-2xl mb-2">Rewards & Unlockables</h2>
          <ul className="list-disc pl-5">
            <li>🥉 Bronze Badge at ₹5,000</li>
            <li>🥈 Silver Badge at ₹10,000</li>
            <li>🥇 Gold Badge at ₹20,000</li>
          </ul>
        </section>
      </div>

      <Leaderboard data={leaderboardData} />

      {showModal && (
        <div className="fixed inset-0 bg-black/30 rounded-xl shadow-xl flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center space-y-4 max-w-xs">
            <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto" />
            <h3 className="text-xl font-semibold">Donated!</h3>
            <p>
              {profile.name}, thank you for donating ₹{donatedAmount}.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
