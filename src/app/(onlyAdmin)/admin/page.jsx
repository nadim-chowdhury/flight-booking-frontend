import Link from "next/link";
import Dashboard from "@/components/Dashboard";

export default function AdminPage() {
  // Define the sections dynamically
  const adminSections = [
    { href: "/admin/airlines", label: "Airlines" },
    { href: "/admin/airports", label: "Airports" },
    // { href: "/admin/bookings", label: "Bookings" },
    { href: "/admin/countries", label: "Countries" },
    // { href: "/admin/flights", label: "Flights" },
    { href: "/admin/planes", label: "Planes" },
    // { href: "/admin/reports", label: "Reports" },
    { href: "/admin/routes", label: "Routes" },
    // { href: "/admin/users", label: "Users" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

      <Dashboard />

      <h3 className="text-2xl font-bold mb-8">Manage Data</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {adminSections.map((section) => (
          <li key={section.href}>
            <Link href={section.href}>
              <div className="text-sky-600 font-medium hover:underline bg-gradient-to-br from-sky-50 to-white border p-6 rounded-md">
                {section.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
