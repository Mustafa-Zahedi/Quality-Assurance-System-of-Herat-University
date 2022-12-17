import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

// Load faculties and return as JSON.
export async function httpPostFaculties(data) {
  try {
    const response = await fetch(`${API_URL}/faculty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log("create faculty error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

// Load faculties and return as JSON.
export async function httpPutFaculties(data) {
  try {
    const response = await fetch(`${API_URL}/faculty`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("update faculty error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export const deleteFaculty = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/faculty`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    console.log("delete", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};
