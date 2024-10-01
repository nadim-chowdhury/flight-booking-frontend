export default function FinalTravelerInfo() {
  return (
    <div className="traveler-info">
      <div className="bg-rose-500 py-1 rounded-lg mb-3">
        <p className="font-bold mb-0 text-white">
          Traveler 1 <span>(Adult)</span>
        </p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "105px" }}
          >
            Name :
          </p>
          <p className="text-sm font-bold ml-2">Mr Price Erickson</p>
        </div>

        {/* Gender */}
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "125px" }}
          >
            Gender :
          </p>
          <p className="text-sm font-bold ml-2">Male</p>
        </div>

        {/* Date of Birth */}
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "105px" }}
          >
            Date of Birth :
          </p>
          <p className="text-sm font-bold ml-2">11 January, 1979</p>
        </div>

        {/* Passport Number */}
        <div className="flex items-end">
          <p
            className="text-sm font-bold"
            style={{ width: "125px" }}
          >
            Passport Number :
          </p>
          <p className="text-sm font-bold ml-2">13</p>
        </div>

        {/* Country */}
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "105px" }}
          >
            Country :
          </p>
          <p className="text-sm font-bold ml-2">Cape Verde</p>
        </div>

        {/* Email */}
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "125px" }}
          >
            Email :
          </p>
          <p className="text-sm font-bold ml-2">dywok@mailinator.com</p>
        </div>

        {/* Phone Number */}
        <div className="flex">
          <p
            className="text-sm font-bold"
            style={{ width: "105px" }}
          >
            Phone Number :
          </p>
          <p className="text-sm font-bold ml-2">880654646556565</p>
        </div>
      </div>
    </div>
  );
}
