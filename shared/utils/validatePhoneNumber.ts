import { toast } from "sonner";

const validatePhoneNumber = (number: string) => {
  const length = number.length;
  if (!number) {
    return false;
  }
  
  if (number.match(/\D/g)) {
    toast.error("Phone Number cannot contain letters", {
      position: "top-right",
    });
    return false;
  }

  if (length < 10) {
    toast.error("Phone Number length is less than 10 digits", {
      position: "top-right",
    });
    return false;
  }
  if (length > 13) {
    toast.error("Phone Number length is greater than 13 digits", {
      position: "top-right",
    });
    return false;
  }
  return true;
};

export { validatePhoneNumber };
