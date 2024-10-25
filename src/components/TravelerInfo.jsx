// "use client";

// import { useEffect, useState } from "react";

// export default function TravelerInfo({
//   travelerType,
//   travelerId,
//   setPassengerData,
// }) {
//   const [travelerDetails, setTravelerDetails] = useState({
//     title: "",
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     passportNumber: "",
//     passportExpiry: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTravelerDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     setPassengerData(travelerDetails);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [travelerDetails]);

//   return (
//     <div className="mt-6 bg-slate-50 border rounded-lg p-4">
//       <h4 className="font-semibold text-lg text-slate-800 mb-4">
//         {travelerType} Information - {travelerId}
//       </h4>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Title */}
//         <div className="mb-4">
//           <label className="block mb-2">Title</label>
//           <select
//             name="title"
//             value={travelerDetails.title}
//             onChange={handleInputChange}
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="">Select Title</option>
//             <option value="Mr">Mr</option>
//             <option value="Ms">Ms</option>
//             <option value="Mrs">Mrs</option>
//           </select>
//         </div>

//         {/* Date of Birth */}
//         <div className="mb-4">
//           <label className="block mb-2">Date of Birth</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={travelerDetails.dateOfBirth}
//             onChange={handleInputChange}
//             className="w-full border rounded-lg p-2"
//           />
//         </div>
//       </div>

//       {/* Responsive Grid for First and Last Name */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* First Name */}
//         <div className="mb-4">
//           <label className="block mb-2">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={travelerDetails.firstName}
//             onChange={handleInputChange}
//             className="w-full border rounded-lg p-2"
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-4">
//           <label className="block mb-2">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={travelerDetails.lastName}
//             onChange={handleInputChange}
//             className="w-full border rounded-lg p-2"
//           />
//         </div>
//       </div>

//       {/* Passport Details (Only for Adults) */}
//       {travelerType === "Adult" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="mb-4">
//             <label className="block mb-2">Passport Number</label>
//             <input
//               type="text"
//               name="passportNumber"
//               value={travelerDetails.passportNumber}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Passport Expiry</label>
//             <input
//               type="date"
//               name="passportExpiry"
//               value={travelerDetails.passportExpiry}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function TravelerInfo({
  travelerType,
  travelerId,
  setPassengerData,
}) {
  const [travelerDetails, setTravelerDetails] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
    cabin: "ECONOMY", // defaulting cabin based on JSON details
    fareBasis: "", // defaulting fareBasis based on JSON details
    includedCheckedBags: 1, // defaulting includedCheckedBags based on JSON details
  });

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  const formattedSixMonthsFromNow = format(sixMonthsFromNow, "yyyy-MM-dd");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent setting value if it's earlier than the minimum allowed date
    if (name === "passportExpiry" && new Date(value) < sixMonthsFromNow) {
      return; // Ignore this change as it's outside of the allowed range
    }

    // Update the value for valid input
    setTravelerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPassengerData(travelerDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelerDetails]);

  return (
    <div className="mt-6 bg-slate-50 border rounded-lg p-4">
      <h4 className="font-semibold text-lg text-slate-800 mb-4">
        {travelerType} Information - {travelerId}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2">Title</label>
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

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={travelerDetails.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Responsive Grid for First and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
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
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={travelerDetails.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Passport Details (Only for Adults) */}
      {travelerType === "ADULT" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={travelerDetails.passportNumber}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Passport Expiry</label>
            <input
              type="date"
              name="passportExpiry"
              value={travelerDetails.passportExpiry}
              onChange={handleInputChange}
              min={formattedSixMonthsFromNow}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      )}

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="mb-4">
          <label className="block mb-2">Cabin Class</label>
          <select
            name="cabin"
            value={travelerDetails.cabin}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Included Checked Bags</label>
          <input
            type="number"
            name="includedCheckedBags"
            value={travelerDetails.includedCheckedBags}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
