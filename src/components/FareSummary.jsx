import React from "react";

export default function FareSummary({ fareSummary }) {
  const {
    totalFareAmount = 0,
    breakdown = {},
    refundable = false,
    lastTicketDate = "",
    refundPenalty = 0,
  } = fareSummary || {};

  const breakdownData = Object.entries(breakdown).map(([typeKey, fare]) => {
    const typeLabels = {
      ADT: "Adult",
      CH: "Child",
      INF: "Infant",
    };

    return {
      type: typeLabels[typeKey] || typeKey,
      baseFare: fare?.baseFareAmount || 0,
      taxesAndFees: fare?.taxAmount || 0,
      totalPerPassenger: fare?.fareAmount || 0,
      count: fare?.paxCount || 0,
      total: fare?.fareAmount || 0,
    };
  });

  const totalTravelers = breakdownData.reduce(
    (acc, fare) => acc + fare.count,
    0
  );

  return (
    <div className="my-3 border rounded-md">
      <p className="border-b px-3 py-2 font-bold">
        Fare Breakdown
      </p>

      <div className="m-3 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-slate-100">
              <th className="border px-2 py-2 text-sm font-semibold">
                Fare Summary
              </th>
              <th className="border px-2 py-2 text-sm font-semibold">
                Base Fare
              </th>
              <th className="border px-2 py-2 text-sm font-semibold">
                Taxes + Fees
              </th>
              <th className="border px-2 py-2 text-sm font-semibold">
                Per Passenger
              </th>
              <th className="border px-2 py-2 text-sm font-semibold">Total</th>
            </tr>
          </thead>

          <tbody>
            {breakdownData.length > 0 ? (
              breakdownData.map((fare, index) => (
                <tr className="text-sm" key={index}>
                  <td className="border px-2 py-2">{fare.type}</td>
                  <td className="border px-2 py-2">
                    BDT {fare.baseFare.toLocaleString()}
                  </td>
                  <td className="border px-2 py-2">
                    BDT {fare.taxesAndFees.toLocaleString()}
                  </td>
                  <td className="border px-2 py-2">
                    BDT ({fare.totalPerPassenger.toLocaleString()} x{" "}
                    {fare.count})
                  </td>
                  <td className="border px-2 py-2">
                    BDT {fare.total.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border px-2 py-2 text-center text-slate-500"
                >
                  No fare breakdown available.
                </td>
              </tr>
            )}

            {/* Total Row */}
            <tr className="text-sm">
              <td className="border px-2 py-2 font-bold text-sky-600">
                Total ({totalTravelers} Traveler
                {totalTravelers > 1 ? "s" : ""})
              </td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2 font-bold text-sky-600">
                BDT {totalFareAmount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Fare Information */}
      <div className="m-3">
        {/* <p className="text-sm font-medium text-slate-600">
          Last Ticket Date: {lastTicketDate || "N/A"}
        </p> */}
        <p className="text-sm font-medium text-slate-600">
          Refundable: {refundable ? "Yes" : "No"}
        </p>
        {refundable && (
          <p className="text-sm font-medium text-slate-600">
            Refund Penalty: {refundPenalty}%
          </p>
        )}
      </div>
    </div>
  );
}
