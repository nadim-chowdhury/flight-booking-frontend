"use client";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <div className="">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <p className="text-lg mb-6">
          We&apos;re here to help! If you have any questions, feedback, or need
          assistance, feel free to reach out to us using the contact information
          below or fill out our contact form.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Customer Support
        </h2>
        <p className="mb-6">
          For any issues related to bookings, payments, or general inquiries,
          our support team is available 24/7.
        </p>
        <p className="mb-4">
          Email:{" "}
          <a href="mailto:support@flightx.com" className="text-sky-600">
            support@flightx.com
          </a>
        </p>
        <p className="mb-4">
          Phone:{" "}
          <a href="tel:+1234567890" className="text-sky-600">
            +1 (234) 567-890
          </a>
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Visit Us</h2>
        <p className="mb-4">
          Headquarters: 123 FlightX Street, Suite 500, City, Country
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Contact Form
        </h2>
        <form className="bg-slate-50 border p-6 rounded-lg">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded-lg p-2"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-lg p-2"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full border rounded-lg p-2"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-sky-600 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
