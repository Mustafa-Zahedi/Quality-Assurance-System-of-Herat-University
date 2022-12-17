import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

export async function httpPostDepartment(data) {
  // console.log("date", data);
  try {
    const response = await fetch(`${API_URL}/department`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("create department error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export async function httpPutDepartment(data) {
  try {
    const response = await fetch(`${API_URL}/department`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("update department error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export const deleteDepartment = async function (id) {
  let response;

  try {
    response = await fetch(`${API_URL}/department`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    console.log("delete department", response);
  } catch (error) {
    console.log("delete department error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }

  return response;
};
