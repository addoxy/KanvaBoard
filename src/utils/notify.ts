import { toast } from "react-hot-toast";

type notifType = "success" | "failure" | "warning";

interface NotifyPromiseStatesMessage {
  success: string | ((result: any) => string);
  error: string | ((error: Error) => string);
  loading: string;
}

const toastStyle = {
  background: "#27272a",
  color: "#E4E4E7",
  wordWrap: "break-word",
} as const;

export const notify = (message: string, type: notifType) => {
  if (type === "success") {
    toast.success(message, {
      style: toastStyle,
    });
  } else if (type === "failure") {
    toast.error(message, {
      style: toastStyle,
    });
  } else if (type === "warning") {
    toast(message, {
      icon: "⚠️",
      style: toastStyle,
    });
  }
};

export const notifyPromise = (
  promise: Promise<any>,
  states: NotifyPromiseStatesMessage
) => {
  const { success, error, loading } = states;
  toast.promise(
    promise,
    {
      loading: loading,
      success: success,
      error: error,
    },
    {
      style: toastStyle,
    }
  );
};
