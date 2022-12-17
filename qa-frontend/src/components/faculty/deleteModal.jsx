import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { deleteFaculty } from "../../services/faculty";
import { ToastMsg } from "../TaostMsg";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  title,
  text,
  confirmText,
  denyText,
  refetch,
  faculty,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  async function confirmDelete(data) {
    const result = await deleteFaculty({ id: data.id });
    if (result.ok) {
      toast.success(<ToastMsg text={faculty.fa_name + " موفقانه حذف شد"} />);
      refetch();
    } else {
      toast.warning(<ToastMsg text={"متاسفانه تغییرات اعمال نشد"} />);
      // console.log(result.statusText);
    }
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-vazirBold"
          onClose={closeModal}
          dir="rtl"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex items-center gap-10 text-sm text-gray-500">
                      <div className="font-vazirBold">
                        آیا مطمین هستید که میخواهید فاکولته{" "}
                        <span className="text-cyan-700 font-vazirBlack text-lg">
                          {faculty.fa_name}
                        </span>{" "}
                        را حذف کنید
                        <p>
                          <span className="text-red-500 text-lg">هشدار: </span>
                          تمام اطلاعات،دیپارتمنت ها، اساتید ،فورم ها و گزاش های
                          مربوطه نیز حذف خواهند شد
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {denyText}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => confirmDelete(faculty)}
                    >
                      {confirmText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
