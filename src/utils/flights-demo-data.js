export const flightsDemoData = [
  {
    id: "1",
    airline: "Airline A",
    from: "New York (JFK)",
    to: "London (LHR)",
    departureTime: "2024-09-21 08:00 AM",
    arrivalTime: "2024-09-21 08:00 PM",
    duration: "10h",
    price: 500,
  },
  {
    id: "2",
    airline: "Airline B",
    from: "San Francisco (SFO)",
    to: "Tokyo (NRT)",
    departureTime: "2024-09-22 09:00 AM",
    arrivalTime: "2024-09-23 11:00 AM",
    duration: "12h",
    price: 750,
  },
  {
    id: "3",
    airline: "Airline C",
    from: "Los Angeles (LAX)",
    to: "Sydney (SYD)",
    departureTime: "2024-09-23 10:00 PM",
    arrivalTime: "2024-09-24 07:00 AM",
    duration: "15h",
    price: 900,
  },
];

export const demoFlightsSearchResults = [
  {
    _id: "671c00149de8b116d051ec16",
    type: "flight-order",
    id: "eJzTd9f3MwrwDjABAAr0AkU%3D",
    queuingOfficeId: "NCE4D31SB",
    associatedRecords: [
      {
        reference: "N2PKP4",
        creationDate: "2024-10-25T14:31:00.000Z",
        originSystemCode: "GDS",
        flightOfferId: "1",
        _id: "671c00149de8b116d051ec17",
      },
    ],
    flightOffers: [
      {
        type: "flight-offer",
        id: "1",
        source: "GDS",
        lastTicketingDate: "2024-10-26T00:00:00.000Z",
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: "MAN",
                  terminal: "1",
                  at: "2024-11-12T17:15:00",
                },
                arrival: {
                  iataCode: "LIS",
                  terminal: "1",
                  at: "2024-11-12T20:05:00",
                },
                carrierCode: "TP",
                number: "1313",
                aircraft: {
                  code: "E95",
                },
                duration: "PT2H50M",
                id: "18",
                co2Emissions: [
                  {
                    weight: 153,
                    weightUnit: "KG",
                    cabin: "ECONOMY",
                  },
                ],
                _id: "671c00149de8b116d051ec1a",
              },
              {
                departure: {
                  iataCode: "LIS",
                  terminal: "1",
                  at: "2024-11-13T07:15:00",
                },
                arrival: {
                  iataCode: "BCN",
                  terminal: "1",
                  at: "2024-11-13T10:05:00",
                },
                carrierCode: "TP",
                number: "1030",
                aircraft: {
                  code: "319",
                },
                duration: "PT1H50M",
                id: "19",
                co2Emissions: [
                  {
                    weight: 103,
                    weightUnit: "KG",
                    cabin: "ECONOMY",
                  },
                ],
                _id: "671c00149de8b116d051ec1b",
              },
            ],
            _id: "671c00149de8b116d051ec19",
          },
        ],
        price: {
          currency: "USD",
          total: "130.70",
          base: "39.00",
          fees: [
            {
              amount: "0.00",
              type: "TICKETING",
            },
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "FORM_OF_PAYMENT",
            },
          ],
          grandTotal: "130.70",
          billingCurrency: "USD",
          _id: "671c00149de8b116d051ec1c",
        },
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "USD",
              total: "130.70",
              base: "39.00",
              _id: "671c00149de8b116d051ec1e",
              fees: [],
            },
            fareDetailsBySegment: [
              {
                segmentId: "18",
                cabin: "ECONOMY",
                fareBasis: "EF0DSC00",
                brandedFare: "DISCOUNT",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
              },
              {
                segmentId: "19",
                cabin: "ECONOMY",
                fareBasis: "EF0DSC00",
                brandedFare: "DISCOUNT",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
            _id: "671c00149de8b116d051ec1d",
          },
        ],
        _id: "671c00149de8b116d051ec18",
      },
    ],
    travelers: [
      {
        id: "1",
        dateOfBirth: "1999-02-01T00:00:00.000Z",
        gender: "FEMALE",
        name: {
          firstName: "Wilma",
          lastName: "Castillo",
        },
        documents: [
          {
            number: "492",
            expiryDate: "2025-04-30T00:00:00.000Z",
            issuanceCountry: "US",
            nationality: "US",
            documentType: "PASSPORT",
            holder: true,
            _id: "671c00149de8b116d051ec20",
          },
        ],
        contact: {
          purpose: "STANDARD",
          phones: [
            {
              deviceType: "MOBILE",
              countryCallingCode: "1",
              number: "1234567890",
            },
          ],
          emailAddress: "test@email.com",
          _id: "671c00149de8b116d051ec21",
        },
        _id: "671c00149de8b116d051ec1f",
      },
    ],
    ticketingAgreement: {
      option: "CONFIRM",
      _id: "671c00149de8b116d051ec22",
    },
    automatedProcess: [
      {
        code: "IMMEDIATE",
        queue: {
          number: "0",
          category: "0",
        },
        officeId: "NCE4D31SB",
        _id: "671c00149de8b116d051ec23",
      },
    ],
    __v: 0,
  },
  {
    _id: "671bd0c86bb4488dbe88bca1",
    type: "flight-order",
    id: "eJzTd9f3jYrwDjEBAAveAng%3D",
    queuingOfficeId: "NCE4D31SB",
    associatedRecords: [
      {
        reference: "MZXKT4",
        creationDate: "2024-10-25T11:09:00.000Z",
        originSystemCode: "GDS",
        flightOfferId: "1",
        _id: "671bd0c86bb4488dbe88bca2",
      },
    ],
    flightOffers: [
      {
        type: "flight-offer",
        id: "1",
        source: "GDS",
        lastTicketingDate: "2024-10-26T00:00:00.000Z",
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: "MAN",
                  terminal: "1",
                  at: "2024-10-30T11:25:00",
                },
                arrival: {
                  iataCode: "LIS",
                  terminal: "1",
                  at: "2024-10-30T14:15:00",
                },
                carrierCode: "TP",
                number: "1311",
                aircraft: {
                  code: "E95",
                },
                duration: "PT2H50M",
                id: "17",
                co2Emissions: [
                  {
                    weight: 153,
                    weightUnit: "KG",
                    cabin: "ECONOMY",
                  },
                ],
                _id: "671bd0c86bb4488dbe88bca5",
              },
              {
                departure: {
                  iataCode: "LIS",
                  terminal: "1",
                  at: "2024-10-30T17:30:00",
                },
                arrival: {
                  iataCode: "BCN",
                  terminal: "1",
                  at: "2024-10-30T20:20:00",
                },
                carrierCode: "TP",
                number: "1038",
                aircraft: {
                  code: "E90",
                },
                duration: "PT1H50M",
                id: "18",
                co2Emissions: [
                  {
                    weight: 103,
                    weightUnit: "KG",
                    cabin: "ECONOMY",
                  },
                ],
                _id: "671bd0c86bb4488dbe88bca6",
              },
            ],
            _id: "671bd0c86bb4488dbe88bca4",
          },
        ],
        price: {
          currency: "USD",
          total: "140.30",
          base: "39.00",
          fees: [
            {
              amount: "0.00",
              type: "TICKETING",
            },
            {
              amount: "0.00",
              type: "SUPPLIER",
            },
            {
              amount: "0.00",
              type: "FORM_OF_PAYMENT",
            },
          ],
          grandTotal: "140.30",
          billingCurrency: "USD",
          _id: "671bd0c86bb4488dbe88bca7",
        },
        travelerPricings: [
          {
            travelerId: "1",
            fareOption: "STANDARD",
            travelerType: "ADULT",
            price: {
              currency: "USD",
              total: "140.30",
              base: "39.00",
              _id: "671bd0c86bb4488dbe88bca9",
              fees: [],
            },
            fareDetailsBySegment: [
              {
                segmentId: "17",
                cabin: "ECONOMY",
                fareBasis: "EF0DSC00",
                brandedFare: "DISCOUNT",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
              },
              {
                segmentId: "18",
                cabin: "ECONOMY",
                fareBasis: "EF0DSC00",
                brandedFare: "DISCOUNT",
                class: "E",
                includedCheckedBags: {
                  quantity: 0,
                },
              },
            ],
            _id: "671bd0c86bb4488dbe88bca8",
          },
        ],
        _id: "671bd0c86bb4488dbe88bca3",
      },
    ],
    travelers: [
      {
        id: "1",
        dateOfBirth: "2000-07-26T00:00:00.000Z",
        gender: "MALE",
        name: {
          firstName: "Aspen",
          lastName: "Figueroa",
        },
        documents: [
          {
            number: "846",
            expiryDate: "2025-04-28T00:00:00.000Z",
            issuanceCountry: "US",
            nationality: "US",
            documentType: "PASSPORT",
            holder: true,
            _id: "671bd0c86bb4488dbe88bcab",
          },
        ],
        contact: {
          purpose: "STANDARD",
          phones: [
            {
              deviceType: "MOBILE",
              countryCallingCode: "1",
              number: "1234567890",
            },
          ],
          emailAddress: "example@mail.com",
          _id: "671bd0c86bb4488dbe88bcac",
        },
        _id: "671bd0c86bb4488dbe88bcaa",
      },
    ],
    ticketingAgreement: {
      option: "CONFIRM",
      _id: "671bd0c86bb4488dbe88bcad",
    },
    automatedProcess: [
      {
        code: "IMMEDIATE",
        queue: {
          number: "0",
          category: "0",
        },
        officeId: "NCE4D31SB",
        _id: "671bd0c86bb4488dbe88bcae",
      },
    ],
    __v: 0,
  },
];
