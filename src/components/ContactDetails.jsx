"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactDetails() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+880");

  return (
    <div className="bg-slate-50 border rounded-lg p-4 mt-6">
      {/* Contact Details Section */}
      <div className="personal-details">
        <h3 className="font-bold text-2xl mb-0 text-slate-900 pr-3">
          Contact Details
        </h3>
        <div className="passport flex items-center mt-3">
          <svg
            className="mr-3"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
              stroke="#6E7491"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M9 6V9.75"
              stroke="#6E7491"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M8.99585 12H9.00259"
              stroke="#6E7491"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <p className="text-sm mb-0">Receive booking confirmation & updates</p>
        </div>
      </div>

      {/* Update Info Section */}
      <div className="update-info mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Field */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="text-sm font-semibold mb-1 block">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control border border-[#cacaca] rounded px-4 py-2 w-full h-[45px]"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Field */}
          <div className="form-group mb-3">
            <label htmlFor="phone" className="text-sm font-semibold mb-1 block">
              Contact Number <span className="text-rose-500">*</span>
            </label>
            <PhoneInput
              country={"bd"}
              value={phone}
              onChange={setPhone}
              inputClass="form-control px-4 py-2 w-full"
              inputStyle={{ width: "100%", height: "45px" }}
              buttonClass="country-selector"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
