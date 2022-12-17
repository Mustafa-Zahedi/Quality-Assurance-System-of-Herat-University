import { useState } from "react";
import { useContext } from "react";
import AddFrom from "../components/evalution-from/addFrom";
import DeleteModal from "../components/evalution-from/deleteModal";
import EvaluationFromTable from "../components/evalution-from/table";
import UpdateForm from "../components/evalution-from/update";
import Loading from "../components/loading";
import Modal from "../components/modal";
import { FacultyContext } from "../context/facultyContext";
import useFetch from "../hooks/useFetch";

const Form = () => {
  const faculty = useContext(FacultyContext);
  const [addNew, setAddNew] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(false);

  let { data: faculties } = useFetch("faculty");
  let { loading: laodingdata, data: forms, error, refetch } = useFetch("form");

  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  forms = faculty
    ? forms?.filter((fr) => fr.department.facultyId === faculty.id)
    : forms;

  // console.log("form-evaluaito", forms);

  const deleteF = async (data) => {
    setSelectedForm(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    setSelectedForm(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="grid w-full font-vazirBold">
        <DeleteModal
          data={selectedForm}
          isOpen={isOpenDeleteModal}
          refetch={refetch}
          setIsOpen={setIsOpenDeleteModal}
        />
        <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
          <UpdateForm
            faculties={faculties}
            formData={selectedForm}
            refetch={refetch}
            setLoading={setLoading}
            setIsOpen={setIsOpenUpdateModal}
          />
        </Modal>
        {!addNew ? (
          <EvaluationFromTable
            setIsOpenModal={setAddNew}
            forms={forms}
            deleteF={deleteF}
            updateF={updateF}
          />
        ) : (
          <AddFrom
            faculties={faculties}
            refetch={refetch}
            setAddNew={setAddNew}
          />
        )}
      </div>
    </section>
  );
};

export default Form;
