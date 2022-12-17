import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

// Load current form and return as JSON.
export async function httpPostForm(data) {
  try {
    const response = await fetch(`${API_URL}/form/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log("creat form error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

// Load faculties and return as JSON.
export async function httpPutForm(data) {
  try {
    const response = await fetch(`${API_URL}/form`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    console.log("update form error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export const deleteForm = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/form?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("delete", response);
  } catch (error) {
    console.log("delete form error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }

  return response;
};

export const httpGetForm = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/form/find?formId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    // console.log("GET FORM", response);
  } catch (error) {
    // console.log("login error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }

  return response;
};

export async function httpPostAnswres(data) {
  const response = await fetch(`${API_URL}/answer/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}
