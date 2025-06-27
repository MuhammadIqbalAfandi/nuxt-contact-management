import Swal from "sweetalert2";
import type { SweetAlertResult } from "sweetalert2";

export const alertSuccess = async (
  message: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

export const alertError = async (
  message: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

export const alertConfirm = async (message: string): Promise<boolean> => {
  return Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    cancelButtonColor: "#3085d6",
    confirmButtonColor: "#d33",
  }).then((result) => {
    return result.isConfirmed;
  });
};
