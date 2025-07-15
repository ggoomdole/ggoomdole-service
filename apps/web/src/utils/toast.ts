import { toast } from "sonner";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "var(--color-main-100)",
      color: "var(--color-main-900)",
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "var(--color-red-100)",
      color: "var(--color-red-900)",
    },
  });
};
