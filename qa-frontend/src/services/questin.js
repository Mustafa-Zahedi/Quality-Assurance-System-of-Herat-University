import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

export async function httpPostQuestion(data) {
  try {
    const response = await fetch(`${API_URL}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("create question error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export async function httpPutQuestion(data) {
  // console.log("dfata😀😀", data);
  try {
    const response = await fetch(`${API_URL}/question`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("update question error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }
}

export const deleteQuestion = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/question?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("delete", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};
