import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";

const API_URL = process.env.REACT_APP_API_URL;

export async function httpPostSubject(data) {
  try {
    const response = await fetch(`${API_URL}/subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("create subject error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export async function httpPutSubject(data) {
  console.log("dfata😀😀", data);
  try {
    const response = await fetch(`${API_URL}/subject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("update subject error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export const deleteSubject = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/subject`, {
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

export const updateSubject = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/subject`, {
      method: "PUT",
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
