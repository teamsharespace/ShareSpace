import { useState, useRef, useEffect } from "react";

export default function Payments() {
  const [activeTab, setActiveTab] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dummyPayments = [
    { uid: "#12345", price: "₹500", timeSlot: "10:00 AM - 12:00 PM", date: "Feb 10, 2025", type: "Credit Card", people: 2 },
    { uid: "#67890", price: "₹1200", timeSlot: "2:00 PM - 4:00 PM", date: "Feb 11, 2025", type: "UPI", people: 4 },
    { uid: "#54321", price: "₹700", timeSlot: "3:30 PM - 5:30 PM", date: "Feb 12, 2025", type: "Debit Card", people: 3 },
    { uid: "#98765", price: "₹900", timeSlot: "6:00 PM - 8:00 PM", date: "Feb 13, 2025", type: "Other", people: 5 },
  ];

  const paymentTypes = ["All", "Credit Card", "Debit Card", "UPI", "Other"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-12 p-4">
      {/* Overview Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-white border-2 border-[#EDE9FE] rounded-xl ">
          <h3 className="text-gray-500 text-sm">Total Profit</h3>
          <p className="text-xl font-semibold text-gray-900">₹45,000</p>
        </div>
        <div className="p-4 bg-white border-2 border-[#EDE9FE] rounded-xl ">
          <h3 className="text-gray-500 text-sm">Active Hours</h3>
          <p className="text-xl font-semibold text-gray-900">120 hrs</p>
        </div>
        <div className="p-4 bg-white border-2 border-[#EDE9FE] rounded-xl ">
          <h3 className="text-gray-500 text-sm">New Customers</h3>
          <p className="text-xl font-semibold text-gray-900">35</p>
        </div>
        <div className="p-4 bg-white border-2 border-[#EDE9FE] rounded-xl ">
          <h3 className="text-gray-500 text-sm">Total Transactions</h3>
          <p className="text-xl font-semibold text-gray-900">85</p>
        </div>
      </div>

      {/* Payment Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Payments</h2>

      {/* Dropdown Filter */}
      <div className="relative mb-4 w-full sm:w-64" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")}
          <span className="text-gray-600">&#9662;</span>
        </button>
        {dropdownOpen && (
          <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
            {paymentTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveTab(type.toLowerCase().replace(" ", "-"));
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-violet-600 text-white">
              <th className="p-3 text-left">UID</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Time Slot</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Payment Type</th>
              <th className="p-3 text-left">People</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayments
              .filter((payment) => activeTab === "all" || payment.type.toLowerCase().replace(" ", "-") === activeTab)
              .map((payment, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{payment.uid}</td>
                  <td className="p-3">{payment.price}</td>
                  <td className="p-3">{payment.timeSlot}</td>
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">{payment.type}</td>
                  <td className="p-3">{payment.people}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
