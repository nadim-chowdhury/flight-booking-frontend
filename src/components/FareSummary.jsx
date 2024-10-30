import React from "react";

export default function FareSummary({ fareSummary }) {
  const {
    price: { grandTotal = 0 } = {},
    travelerPricings = [],
    refundable = false,
    lastTicketDate = "",
    refundPenalty = 0,
  } = fareSummary || {};

  // Grouping traveler pricing data by type
  const breakdownData = travelerPricings.reduce((acc, traveler) => {
    const typeLabels = {
      ADULT: "Adult",
      CHILD: "Child",
      INFANT: "Infant",
    };

    const travelerType =
      typeLabels[traveler.travelerType] || traveler.travelerType;

    if (!acc[travelerType]) {
      acc[travelerType] = {
        type: travelerType,
        baseFare: 0,
        taxesAndFees: 0,
        totalPerPassenger: 0,
        count: 0,
        total: 0,
      };
    }

    acc[travelerType].baseFare += parseFloat(traveler.price.base);
    acc[travelerType].taxesAndFees +=
      parseFloat(traveler.price.total) - parseFloat(traveler.price.base);
    acc[travelerType].totalPerPassenger = parseFloat(traveler.price.total);
    acc[travelerType].count += 1;
    acc[travelerType].total += parseFloat(traveler.price.total);

    return acc;
  }, {});

  const breakdownArray = Object.values(breakdownData);
  const totalTravelers = breakdownArray.reduce(
    (acc, fare) => acc + fare.count,
    0
  );

  return (
    <div className="my-3 border rounded-md">
      <p className="border-b px-3 py-2 font-bold">Fare Breakdown</p>

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
            {breakdownArray.length > 0 ? (
              breakdownArray.map((fare, index) => (
                <tr className="text-sm" key={index}>
                  <td className="border px-2 py-2">{fare.type}</td>
                  <td className="border px-2 py-2">
                    $ {fare.baseFare.toLocaleString()}
                  </td>
                  <td className="border px-2 py-2">
                    $ {fare.taxesAndFees.toLocaleString()}
                  </td>
                  <td className="border px-2 py-2">
                    $ ({fare.totalPerPassenger.toLocaleString()} x {fare.count})
                  </td>
                  <td className="border px-2 py-2">
                    $ {fare.total.toLocaleString()}
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
                Total ({totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""})
              </td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2"></td>
              <td className="border px-2 py-2 font-bold text-sky-600">
                $ {grandTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Fare Information */}
      <div className="m-3">
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
