import Link from "next/link";
import Dashboard from "../../components/Dashboard";

export default function AdminPage() {
  // Define the sections dynamically
  const adminSections = [
    { href: "/admin/airlines", label: "Manage Airlines" },
    { href: "/admin/airports", label: "Manage Airports" },
    { href: "/admin/bookings", label: "Manage Bookings" },
    { href: "/admin/countries", label: "Manage Countries" },
    { href: "/admin/flights", label: "Manage Flights" },
    { href: "/admin/planes", label: "Manage Planes" },
    { href: "/admin/reports", label: "Manage Reports" },
    { href: "/admin/routes", label: "Manage Routes" },
    { href: "/admin/users", label: "Manage users" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Dashboard />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminSections.map((section) => (
          <li key={section.href}>
            <Link href={section.href}>
              <div className="text-sky-600 font-medium hover:underline bg-sky-50/50 border p-6 rounded-md">
                {section.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
