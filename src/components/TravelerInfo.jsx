"use client";

import { useState } from "react";

export default function TravelerInfo({ travelerType }) {
  const [travelerDetails, setTravelerDetails] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="mt-6 bg-slate-50 border rounded-lg p-4">
      <h4 className="font-semibold text-lg text-gray-800 mb-4">
        {travelerType} Information
      </h4>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <select
          name="title"
          value={travelerDetails.title}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select Title</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>
      </div>

      {/* Responsive Grid for First and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={travelerDetails.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={travelerDetails.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={travelerDetails.dateOfBirth}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Passport Details (Only for Adults) */}
      {travelerType === "Adult" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={travelerDetails.passportNumber}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Passport Expiry</label>
            <input
              type="date"
              name="passportExpiry"
              value={travelerDetails.passportExpiry}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </>
      )}
    </div>
  );
}
