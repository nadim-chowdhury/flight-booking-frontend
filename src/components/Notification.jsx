"use client";

import { useForm } from "react-hook-form";
import { useNotification } from "@/hooks/useNotification";

export default function Notification() {
  const { register, handleSubmit } = useForm();
  const { notify, loading, error } = useNotification();

  const onSubmit = async (formData) => {
    const { type, to, message } = formData;
    try {
      await notify(type, to, message);
      alert("Notification sent successfully!");
    } catch (error) {
      alert("Failed to send notification");
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Type (email/sms):</label>
          <input type="text" {...register("type")} required />
        </div>
        <div>
          <label>To:</label>
          <input type="text" {...register("to")} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea {...register("message")} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
