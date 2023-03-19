import toast from "react-hot-toast";

export const handleToast = (code, msg) => {
  switch (code) {
    case 200:
      return toast.success(msg || "Saved Successfully.!!!");
    case 201:
      return toast.success(msg || "Saved Successfully.!!!");
    case 400:
      return toast.error(msg || "Bad Request.!!!");
    case 401:
      return toast.error(msg || "Access Denied.!!!");
    case 403:
      return toast.error(msg || "Access Denied.!!!");
    case 404:
      return toast.error(msg || "Access Denied.!!!");
    case 422:
      return toast.error(msg || "Password And Confirm Password Mismatch");
    case 429:
      return toast.error(msg || "Too Many Request.!!!");
    case 500:
      return toast.error(msg || "Internal Server Error.!!!");
    case 502:
      return toast.error(msg || "Could not fetch data from remote.!!!");
    default:
      return toast.error(msg || "Something went wrong");
  }
};

