import { useMutation } from "@apollo/client";
import { SEND_NOTIFICATION } from "../graphql/queries";

export const useNotification = () => {
  const [sendNotification, { loading, error }] = useMutation(SEND_NOTIFICATION);

  const notify = async (type, to, message) => {
    try {
      const response = await sendNotification({
        variables: { type, to, message },
      });
      return response.data.sendNotification;
    } catch (error) {
      console.error("Notification error:", error);
      throw new Error("Failed to send notification");
    }
  };

  return { notify, loading, error };
};
