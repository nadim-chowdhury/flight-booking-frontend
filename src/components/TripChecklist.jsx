"use client";

import { useState } from "react";

const TripChecklist = () => {
  const [checklist, setChecklist] = useState([
    {
      category: "Money",
      items: [
        { id: 1, text: "Wallet/Purse", checked: false },
        { id: 2, text: "Debit card/Credit card", checked: false },
        { id: 3, text: "Cash", checked: false },
        { id: 4, text: "Checks/Travelers checks", checked: false },
      ],
    },
    {
      category: "Clothing",
      items: [
        { id: 5, text: "Casual shirts/T-shirts", checked: false },
        { id: 6, text: "Casual pants/Shorts", checked: false },
        { id: 7, text: "Dress shirts/Dress pants", checked: false },
        { id: 8, text: "Pajamas/Robe/Slippers", checked: false },
        { id: 9, text: "Sweaters", checked: false },
        { id: 10, text: "Underwear", checked: false },
        { id: 11, text: "Socks", checked: false },
        { id: 12, text: "Casual shoes/Sandals", checked: false },
        { id: 13, text: "Dress shoes", checked: false },
        { id: 14, text: "Hats/Scarves/Gloves", checked: false },
        { id: 15, text: "Belts", checked: false },
        { id: 16, text: "Jackets/Coats/Sweaters", checked: false },
        { id: 17, text: "Swimwear", checked: false },
        { id: 18, text: "Workout clothes/shoes", checked: false },
        { id: 19, text: "Suits", checked: false },
        { id: 20, text: "Sports Coat", checked: false },
        { id: 21, text: "Ties/Suspenders", checked: false },
        { id: 22, text: "Skirts/Dresses", checked: false },
        { id: 23, text: "Bras", checked: false },
        { id: 24, text: "Girdle/Bodysuit/Slip", checked: false },
        { id: 25, text: "Nylons", checked: false },
      ],
    },
    {
      category: "Electronics",
      items: [
        {
          id: 26,
          text: "Phone and accessories (charger, Bluetooth, case)",
          checked: false,
        },
        {
          id: 27,
          text: "Camera and accessories (charger, extra film/chip)",
          checked: false,
        },
        {
          id: 28,
          text: "Laptop and accessories (charger, extra battery, case)",
          checked: false,
        },
        { id: 29, text: "DVD Player/DVDs", checked: false },
        { id: 30, text: "Music player", checked: false },
        { id: 31, text: "PDA", checked: false },
        { id: 32, text: "GPS system", checked: false },
      ],
    },
    {
      category: "Toiletries",
      items: [
        { id: 33, text: "Toothbrush/Toothpaste", checked: false },
        { id: 34, text: "Dental floss/Picks", checked: false },
        { id: 35, text: "Mouthwash", checked: false },
        { id: 36, text: "Glasses/Case/Contacts/Solution", checked: false },
        { id: 37, text: "Q-Tips/Cotton Balls", checked: false },
        { id: 38, text: "Tweezers/nail clippers", checked: false },
        { id: 39, text: "Deodorant", checked: false },
        { id: 40, text: "Shampoo & Conditioner", checked: false },
        { id: 41, text: "Soap/Body Wash", checked: false },
        { id: 42, text: "Washcloth", checked: false },
        { id: 43, text: "Brush/Comb", checked: false },
        { id: 44, text: "Gel/Hairspray/Hair Products", checked: false },
        { id: 45, text: "Mirror", checked: false },
        { id: 46, text: "Tissue", checked: false },
        { id: 47, text: "Lotion/Lip balm", checked: false },
        { id: 48, text: "Razor/Shave Gel/Aftershave", checked: false },
        { id: 49, text: "Cologne", checked: false },
        { id: 50, text: "Cosmetics", checked: false },
        { id: 51, text: "Facial cleanser", checked: false },
        { id: 52, text: "Pads/Tampons", checked: false },
        { id: 53, text: "Curling Iron/Flat Iron", checked: false },
        { id: 54, text: "Blow dryer/Diffuser", checked: false },
        { id: 55, text: "Hair Accessories", checked: false },
        { id: 56, text: "Perfume", checked: false },
      ],
    },
    {
      category: "Documentation",
      items: [
        { id: 57, text: "Driver’s License", checked: false },
        { id: 58, text: "Birth certificate (if needed)", checked: false },
        { id: 59, text: "Visa/Passport", checked: false },
        { id: 60, text: "Immunization records", checked: false },
        { id: 61, text: "Tickets", checked: false },
        { id: 62, text: "Map", checked: false },
        { id: 63, text: "Itinerary", checked: false },
        { id: 64, text: "Travel guide", checked: false },
      ],
    },
    {
      category: "Laundry",
      items: [
        { id: 65, text: "Laundry bag", checked: false },
        { id: 66, text: "Detergent", checked: false },
        { id: 67, text: "Stain remover", checked: false },
        { id: 68, text: "Fabric Softener/Dryer Sheets", checked: false },
        { id: 69, text: "Coins", checked: false },
        { id: 70, text: "Sewing kit", checked: false },
        { id: 71, text: "Hangers", checked: false },
      ],
    },
    {
      category: "Medical/Health",
      items: [
        { id: 72, text: "Prescriptions", checked: false },
        { id: 73, text: "Allergy medication", checked: false },
        { id: 74, text: "First Aid kit", checked: false },
        { id: 75, text: "Vitamins", checked: false },
        { id: 76, text: "Hand sanitizer/Antibacterial wipes", checked: false },
        { id: 77, text: "Sunscreen", checked: false },
        { id: 78, text: "Pain medication", checked: false },
        { id: 79, text: "Insect repellant", checked: false },
      ],
    },
    {
      category: "Children items",
      items: [
        { id: 80, text: "Snacks & Wipes", checked: false },
        { id: 81, text: "Clothes/Socks/Shoes", checked: false },
        { id: 82, text: "Coats/Hats/Gloves", checked: false },
        { id: 83, text: "Sleeping bags/Pillows", checked: false },
        { id: 84, text: "Games/Toys", checked: false },
        { id: 85, text: "Books", checked: false },
        { id: 86, text: "Coloring books/Crayons", checked: false },
        { id: 87, text: "Sports equipment", checked: false },
      ],
    },
    {
      category: "Before Leaving",
      items: [
        {
          id: 88,
          text: "Enable alarm system, set up light timers",
          checked: false,
        },
        { id: 89, text: "Arrange for care of home/pets", checked: false },
        {
          id: 90,
          text: "Pay any bills that may become outstanding",
          checked: false,
        },
        {
          id: 91,
          text: "Set up your out-of-office email response at work",
          checked: false,
        },
        { id: 92, text: "Lock up home, doors, windows", checked: false },
      ],
    },
  ]);

  const handleCheck = (categoryIndex, itemId) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((category, index) =>
        index === categoryIndex
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : category
      )
    );
  };

  return (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">Travel Packing Checklist</h2>
      <div className="p-4 border rounded-lg bg-slate-50 max-w-6xl mx-auto">
        {checklist.map((category, categoryIndex) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              {category.category}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 pl-4">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(categoryIndex, item.id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label className="text-gray-800">{item.text}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default TripChecklist;
