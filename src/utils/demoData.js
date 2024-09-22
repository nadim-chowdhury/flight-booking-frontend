export const mocksBookingList = [
  {
    bookings: [
      {
        id: "1",
        flight: {
          airline: "Airline A",
          from: "City A",
          to: "City B",
        },
        user: {
          username: "user1",
        },
        status: "confirmed",
      },
      {
        id: "2",
        flight: {
          airline: "Airline B",
          from: "City C",
          to: "City D",
        },
        user: {
          username: "user2",
        },
        status: "cancelled",
      },
    ],
  },
  {
    request: {
      // query: UPDATE_BOOKING_STATUS,
      variables: {
        id: "1",
        status: "cancelled",
      },
    },
    result: {
      data: {
        updateBookingStatus: {
          id: "1",
          status: "cancelled",
        },
      },
    },
  },
  {
    request: {
      // query: UPDATE_BOOKING_STATUS,
      variables: {
        id: "2",
        status: "confirmed",
      },
    },
    result: {
      data: {
        updateBookingStatus: {
          id: "2",
          status: "confirmed",
        },
      },
    },
  },
];

export const mocksAdminDashboardData = {
  dashboardOverview: {
    bookingsCount: 150,
    usersCount: 50,
    flightsCount: 20,
    revenue: 10000,
  },
};

export const FlightListDemo = [
  {
    id: "1",
    airline: "Airways A",
    from: "New York",
    to: "London",
    departureTime: "2024-08-01T10:00:00Z",
    arrivalTime: "2024-08-01T20:00:00Z",
    duration: "8h",
    price: 500,
  },
  {
    id: "2",
    airline: "Airways B",
    from: "Los Angeles",
    to: "Tokyo",
    departureTime: "2024-08-02T15:00:00Z",
    arrivalTime: "2024-08-03T05:00:00Z",
    duration: "12h",
    price: 700,
  },
];

export const flightsDemoDataOneway = {
  flightCombination: [
    {
      flightDetails: [
        {
          flightInformation: {
            productDateTime: {
              dateOfDeparture: "311024",
              timeOfDeparture: "19:00",
              dateOfArrival: "011124",
              timeOfArrival: "00:30",
              dateOfDepartureString: "Thu, 31 Oct 2024",
              dateOfArrivalString: "Fri, 1 Nov 2024",
              journeyTime: 450,
              segmentTime: "7 hours 30 minutes",
              stopOverTime: "",
              layOverTime: 0,
              isStopOverAirportChange: false,
            },
            location: [
              {
                locationId: "DAC",
                terminal: "",
                city: "Dhaka",
                cityCode: "DAC",
                countryName: "Bangladesh",
                airportName: "Hazrat Shahjalal International Airport",
              },
              {
                ARR_ARP: "DXB",
                locationId: "DXB",
                terminal: "",
                city: "Dubai",
                cityCode: "DXB",
                countryName: "United Arab Emirates",
                airportName: "Dubai",
              },
            ],
            companyId: {
              operatingCarrier: "Biman Bangladesh Airlines",
              marketingCarrier: "Biman Bangladesh Airlines",
              marketingCarrierCode: "BG",
              operatingCarrierCode: "BG",
            },
            flightOrtrainNumber: "147",
            productDetail: {
              equipmentType: "Boeing 777-300",
            },
            addProductDetail: {
              electronicTicketing: "Yes",
              cabinClass: "T",
              availableSeats: "9",
              fareClass: "T",
              fareBasis: "TBDAPO",
              techstop: "Technical Stopover at CGP",
            },
          },
          technicalStop: [
            {
              stopDetails: [
                {
                  date: "311024",
                  firstTime: "1945",
                  dateQualifier: "AA",
                  locationId: "CGP",
                },
                {
                  date: "311024",
                  firstTime: "2045",
                  dateQualifier: "AD",
                },
              ],
              details: {
                airportCode: "CGP",
                airportName: "Patenga",
                stopDuration: "1 hour 0 minute",
              },
            },
          ],
        },
      ],
    },
  ],
  fareSummary: {
    breakdown: {
      ADT: {
        totalFareAmount: 32175,
        totalBaseFareAmount: 22102,
        totalTaxAmount: 10073,
        totalFees: 0,
        fareAmount: 32175,
        baseFareAmount: 22102,
        taxAmount: 10073,
        Fees: 0,
        paxCount: 1,
        lastTicketDate: "24Oct24",
        refundable: true,
        ChangePenalty: 0,
        ChangePenaltyUnit: "Percentage",
        CancelPenalty: 0,
        CancelPenaltyUnit: "Percentage",
      },
      CH: {
        totalFareAmount: 46976,
        totalBaseFareAmount: 33154,
        totalTaxAmount: 13822,
        totalFees: 0,
        fareAmount: 23488,
        baseFareAmount: 16577,
        taxAmount: 6911,
        Fees: 0,
        paxCount: 2,
        lastTicketDate: "24Oct24",
        refundable: true,
        ChangePenalty: 0,
        ChangePenaltyUnit: "Percentage",
        CancelPenalty: 0,
        CancelPenaltyUnit: "Percentage",
      },
    },
    refundable: true,
    refundPenalty: 0,
    lastTicketDate: "24Oct24",
    totalFareAmount: 79151,
    totalTaxAmount: 23895,
    totalBaseFareAmount: 55256,
    Fees: 0,
    Services: 0,
  },
  baggage: [
    {
      ADT: {
        city: "DAC - DXB",
        freeAllowance: 30,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
      CH: {
        city: "DAC - DXB",
        freeAllowance: 30,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
    },
  ],
  index: 0,
  has_domestic: true,
  transitAirport: [[]],
  code_share: false,
  segmentWiseLayOverMinutes: [0],
  fareType: "REGULAR",
  cabinClass: ["T"],
  totalLayoverMinutes: 0,
  hasSSR: 0,
  updatedFareRequired: false,
  airlineRemarks: [],
  validatingCarrier: "BG",
  finalFare: 79151,
  flightSummary: [
    {
      fromCode: "DAC",
      fromCity: "Dhaka",
      fromCityCode: "DAC",
      toCode: "DXB",
      toCity: "Dubai",
      toCityCode: "DXB",
      segmentTime: "7 hours 30 minutes",
    },
  ],
  baseIndex: 1,
  journeyTimeFrame: ["afterDusk"],
  totalLayoverTime: ["noLayoverTime"],
  cabinType: "economy",
  flightNumbers: ["BG-147"],
  totalJourneyTime: 450,
  stops: ["0"],
  marketingCarrier: {
    name: "Biman Bangladesh Airlines",
    code: "BG",
  },
};

export const flightsDemoDataReturn = {
  flightCombination: [
    {
      flightDetails: [
        {
          flightInformation: {
            productDateTime: {
              dateOfDeparture: "311024",
              timeOfDeparture: "19:00",
              dateOfArrival: "011124",
              timeOfArrival: "00:30",
              dateOfDepartureString: "Thu, 31 Oct 2024",
              dateOfArrivalString: "Fri, 1 Nov 2024",
              journeyTime: 450,
              segmentTime: "7 hours 30 minutes",
              stopOverTime: "",
              layOverTime: 0,
              isStopOverAirportChange: false,
            },
            location: [
              {
                locationId: "DAC",
                terminal: "",
                city: "Dhaka",
                cityCode: "DAC",
                countryName: "Bangladesh",
                airportName: "Hazrat Shahjalal International Airport",
              },
              {
                ARR_ARP: "DXB",
                locationId: "DXB",
                terminal: "",
                city: "Dubai",
                cityCode: "DXB",
                countryName: "United Arab Emirates",
                airportName: "Dubai",
              },
            ],
            companyId: {
              operatingCarrier: "Biman Bangladesh Airlines",
              marketingCarrier: "Biman Bangladesh Airlines",
              marketingCarrierCode: "BG",
              operatingCarrierCode: "BG",
            },
            flightOrtrainNumber: "147",
            productDetail: {
              equipmentType: "Boeing 777-300",
            },
            addProductDetail: {
              electronicTicketing: "Yes",
              cabinClass: "T",
              availableSeats: "9",
              fareClass: "T",
              fareBasis: "TBDAP6M",
              techstop: "Technical Stopover at CGP",
            },
          },
          technicalStop: [
            {
              stopDetails: [
                {
                  date: "311024",
                  firstTime: "1945",
                  dateQualifier: "AA",
                  locationId: "CGP",
                },
                {
                  date: "311024",
                  firstTime: "2045",
                  dateQualifier: "AD",
                },
              ],
              details: {
                airportCode: "CGP",
                airportName: "Patenga",
                stopDuration: "1 hour 0 minute",
              },
            },
          ],
        },
      ],
    },
    {
      flightDetails: [
        {
          flightInformation: {
            productDateTime: {
              dateOfDeparture: "121124",
              timeOfDeparture: "02:10",
              dateOfArrival: "121124",
              timeOfArrival: "10:45",
              dateOfDepartureString: "Tue, 12 Nov 2024",
              dateOfArrivalString: "Tue, 12 Nov 2024",
              journeyTime: 395,
              segmentTime: "6 hours 35 minutes",
              stopOverTime: "",
              layOverTime: 0,
              isStopOverAirportChange: false,
            },
            location: [
              {
                locationId: "DXB",
                terminal: "1",
                city: "Dubai",
                cityCode: "DXB",
                countryName: "United Arab Emirates",
                airportName: "Dubai",
              },
              {
                ARR_ARP: "DAC",
                locationId: "DAC",
                terminal: "",
                city: "Dhaka",
                cityCode: "DAC",
                countryName: "Bangladesh",
                airportName: "Hazrat Shahjalal International Airport",
              },
            ],
            companyId: {
              operatingCarrier: "Biman Bangladesh Airlines",
              marketingCarrier: "Biman Bangladesh Airlines",
              marketingCarrierCode: "BG",
              operatingCarrierCode: "BG",
            },
            flightOrtrainNumber: "148",
            productDetail: {
              equipmentType: "Boeing 777-300",
            },
            addProductDetail: {
              electronicTicketing: "Yes",
              cabinClass: "T",
              availableSeats: "9",
              fareClass: "T",
              fareBasis: "TBDAP6M",
              techstop: "Technical Stopover at CGP",
            },
          },
          technicalStop: [
            {
              stopDetails: [
                {
                  date: "121124",
                  firstTime: "0900",
                  dateQualifier: "AA",
                  locationId: "CGP",
                },
                {
                  date: "121124",
                  firstTime: "1000",
                  dateQualifier: "AD",
                },
              ],
              details: {
                airportCode: "CGP",
                airportName: "Patenga",
                stopDuration: "1 hour 0 minute",
              },
            },
          ],
        },
      ],
    },
  ],
  fareSummary: {
    breakdown: {
      ADT: {
        totalFareAmount: 54318,
        totalBaseFareAmount: 39784,
        totalTaxAmount: 14534,
        totalFees: 0,
        fareAmount: 54318,
        baseFareAmount: 39784,
        taxAmount: 14534,
        Fees: 0,
        paxCount: 1,
        lastTicketDate: "24Oct24",
        refundable: true,
        ChangePenalty: 0,
        ChangePenaltyUnit: "Percentage",
        CancelPenalty: 0,
        CancelPenaltyUnit: "Percentage",
      },
      CH: {
        totalFareAmount: 82251,
        totalBaseFareAmount: 59678,
        totalTaxAmount: 22573,
        totalFees: 0,
        fareAmount: 41125.5,
        baseFareAmount: 29839,
        taxAmount: 11286.5,
        Fees: 0,
        paxCount: 2,
        lastTicketDate: "24Oct24",
        refundable: true,
        ChangePenalty: 0,
        ChangePenaltyUnit: "Percentage",
        CancelPenalty: 0,
        CancelPenaltyUnit: "Percentage",
      },
    },
    refundable: true,
    refundPenalty: 0,
    lastTicketDate: "24Oct24",
    totalFareAmount: 136569,
    totalTaxAmount: 37107,
    totalBaseFareAmount: 99462,
    Fees: 0,
    Services: 0,
  },
  baggage: [
    {
      ADT: {
        city: "DAC - DXB",
        freeAllowance: 30,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
      CH: {
        city: "DAC - DXB",
        freeAllowance: 30,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
    },
    {
      ADT: {
        city: "DXB - DAC",
        freeAllowance: 50,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
      CH: {
        city: "DXB - DAC",
        freeAllowance: 50,
        quantityCode: "",
        unitQualifier: "Kg(s)",
        cabinBaggage: "7 Kg(s)",
      },
    },
  ],
  index: 0,
  has_domestic: true,
  transitAirport: [[], []],
  code_share: false,
  segmentWiseLayOverMinutes: [0, 0],
  fareType: "REGULAR",
  cabinClass: ["T", "T"],
  totalLayoverMinutes: 0,
  hasSSR: 0,
  updatedFareRequired: false,
  airlineRemarks: [],
  validatingCarrier: "BG",
  finalFare: 136569,
  flightSummary: [
    {
      fromCode: "DAC",
      fromCity: "Dhaka",
      fromCityCode: "DAC",
      toCode: "DXB",
      toCity: "Dubai",
      toCityCode: "DXB",
      segmentTime: "7 hours 30 minutes",
    },
    {
      fromCode: "DXB",
      fromCity: "Dubai",
      fromCityCode: "DXB",
      toCode: "DAC",
      toCity: "Dhaka",
      toCityCode: "DAC",
      segmentTime: "6 hours 35 minutes",
    },
  ],
  baseIndex: 1,
  journeyTimeFrame: ["afterDusk", "afterMidnight"],
  totalLayoverTime: ["noLayoverTime", "noLayoverTime"],
  cabinType: "economy",
  flightNumbers: ["BG-147", "BG-148"],
  totalJourneyTime: 845,
  stops: ["0", "0"],
  marketingCarrier: {
    name: "Biman Bangladesh Airlines",
    code: "BG",
  },
};

export const flightsDemoDataMultiCity = {
  flightCombination: [
    {
      propFlightGrDetail: {
        flightProposal: [
          {
            ref: "3",
          },
          {
            ref: "0500",
            unitQualifier: "EFT",
          },
          {
            ref: "EK",
            unitQualifier: "MCX",
          },
        ],
      },
      flightDetails: [
        {
          flightInformation: {
            productDateTime: {
              dateOfDeparture: "300924",
              timeOfDeparture: "19:30",
              dateOfArrival: "300924",
              timeOfArrival: "22:30",
              dateOfDepartureString: "Mon, 30 Sep 2024",
              dateOfArrivalString: "Mon, 30 Sep 2024",
              journeyTime: 300,
              segmentTime: "5 hours 0 minute",
              stopOverTime: "",
              layOverTime: 0,
              isStopOverAirportChange: false,
            },
            location: [
              {
                locationId: "DAC",
                terminal: "1",
                city: "Dhaka",
                cityCode: "DAC",
                countryName: "Bangladesh",
                airportName: "Hazrat Shahjalal International Airport",
              },
              {
                locationId: "DXB",
                terminal: "3",
                city: "Dubai",
                cityCode: "DXB",
                countryName: "United Arab Emirates",
                airportName: "Dubai",
              },
            ],
            companyId: {
              marketingCarrier: "Emirates",
              operatingCarrier: "Emirates",
              originalMarketingCarrier: "EK",
              marketingCarrierCode: "EK",
              operatingCarrierCode: "EK",
            },
            flightOrtrainNumber: "587",
            productDetail: {
              equipmentType: "Boeing 777-300",
            },
            addProductDetail: {
              electronicTicketing: "Y",
              productDetailQualifier: "AIP",
              cabinClass: "Q",
              availableSeats: "9",
            },
          },
          technicalStop: [],
        },
      ],
    },
    {
      propFlightGrDetail: {
        flightProposal: [
          {
            ref: "1",
          },
          {
            ref: "1355",
            unitQualifier: "EFT",
          },
          {
            ref: "EK",
            unitQualifier: "MCX",
          },
        ],
      },
      flightDetails: [
        {
          flightInformation: {
            productDateTime: {
              dateOfDeparture: "101024",
              timeOfDeparture: "08:30",
              dateOfArrival: "101024",
              timeOfArrival: "14:25",
              dateOfDepartureString: "Thu, 10 Oct 2024",
              dateOfArrivalString: "Thu, 10 Oct 2024",
              journeyTime: 835,
              segmentTime: "13 hours 55 minutes",
              stopOverTime: "",
              layOverTime: 0,
              isStopOverAirportChange: false,
            },
            location: [
              {
                locationId: "DXB",
                terminal: "3",
                city: "Dubai",
                cityCode: "DXB",
                countryName: "United Arab Emirates",
                airportName: "Dubai",
              },
              {
                locationId: "JFK",
                terminal: "4",
                city: "New York",
                cityCode: "NYC",
                countryName: "United States of America",
                airportName: "John F Kennedy Int'l",
              },
            ],
            companyId: {
              marketingCarrier: "Emirates",
              operatingCarrier: "Emirates",
              originalMarketingCarrier: "EK",
              marketingCarrierCode: "EK",
              operatingCarrierCode: "EK",
            },
            flightOrtrainNumber: "201",
            productDetail: {
              equipmentType: "Airbus A380-800",
            },
            addProductDetail: {
              electronicTicketing: "Y",
              productDetailQualifier: "LCA",
              cabinClass: "Q",
              availableSeats: "9",
            },
          },
          technicalStop: [],
        },
      ],
    },
  ],
  fareSummary: {
    breakdown: {
      ADT: {
        fareAmount: 103003,
        taxAmount: 23103,
        baseFareAmount: 79900,
        totalBaseFareAmount: 79900,
        totalFareAmount: 103003,
        totalTaxAmount: 23103,
        paxCount: 1,
      },
      CH: {
        fareAmount: 78169,
        taxAmount: 18161,
        baseFareAmount: 60008,
        totalBaseFareAmount: 120016,
        totalFareAmount: 156338,
        totalTaxAmount: 36322,
        paxCount: 2,
      },
    },
    refundable: false,
    refundPenalty: 0,
    totalFareAmount: 259341,
    totalTaxAmount: 59425,
    totalBaseFareAmount: 199916,
    fareDetails: {
      ADT: [
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1",
          paxRefs: ["1"],
        },
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1",
          paxRefs: ["1"],
        },
      ],
      CH: [
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1CH",
          paxRefs: ["2"],
        },
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1CH",
          paxRefs: ["2"],
        },
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1CH",
          paxRefs: ["3"],
        },
        {
          cabinClass: "Q",
          availableSeats: "9",
          fareBasis: "QAAOPBD1CH",
          paxRefs: ["3"],
        },
      ],
    },
    marketingCarrier: "EK",
  },
  baggage: [
    {
      ADT: {
        freeAllowance: "2",
        quantityCode: "N",
        unitQualifier: "PC(s)",
        cabinBaggage: "7 Kg(s)",
      },
      CH: {
        freeAllowance: "2",
        quantityCode: "N",
        unitQualifier: "PC(s)",
        cabinBaggage: "7 Kg(s)",
      },
    },
    {
      ADT: {
        freeAllowance: "2",
        quantityCode: "N",
        unitQualifier: "PC(s)",
        cabinBaggage: "7 Kg(s)",
      },
      CH: {
        freeAllowance: "2",
        quantityCode: "N",
        unitQualifier: "PC(s)",
        cabinBaggage: "7 Kg(s)",
      },
    },
  ],
  recommendationId: "2",
  fareBasisDetails: [
    {
      ADT: "QAAOPBD1",
      CH: "QAAOPBD1CH",
    },
    {
      ADT: "QAAOPBD1",
      CH: "QAAOPBD1CH",
    },
    {
      CH: "QAAOPBD1CH",
    },
    {
      CH: "QAAOPBD1CH",
    },
  ],
  fareBasisRefs: {
    QAAOPBD1: {
      ST: [1, 2],
      PT: ["1"],
    },
    QAAOPBD1CH: {
      ST: [1, 2, 3, 4],
      PT: ["2", "3"],
    },
  },
  has_domestic: true,
  transitAirport: [[], []],
  code_share: false,
  segmentWiseLayOverMinutes: [0, 0],
  fareType: "REGULAR",
  cabinClass: ["Q", "Q"],
  totalLayoverMinutes: 0,
  hasSSR: 0,
  updatedFareRequired: false,
  airlineRemarks: [],
  validatingCarrier: "EK",
  finalFare: 259341,
  flightSummary: [
    {
      fromCode: "DAC",
      fromCity: "Dhaka",
      fromCityCode: "DAC",
      toCode: "DXB",
      toCity: "Dubai",
      toCityCode: "DXB",
      segmentTime: "5 hours 0 minute",
    },
    {
      fromCode: "DXB",
      fromCity: "Dubai",
      fromCityCode: "DXB",
      toCode: "JFK",
      toCity: "New York",
      toCityCode: "NYC",
      segmentTime: "13 hours 55 minutes",
    },
  ],
  baseIndex: 3,
  journeyTimeFrame: ["afterDusk", "afterDawn"],
  totalLayoverTime: ["noLayoverTime", "noLayoverTime"],
  cabinType: "economy",
  flightNumbers: ["EK-587", "EK-201"],
  totalJourneyTime: 1135,
  stops: ["0", "0"],
  marketingCarrier: {
    name: "Emirates",
    code: "EK",
  },
};
