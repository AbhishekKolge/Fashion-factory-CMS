import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import BackButton from "../../components/UI/Button/BackButton";
import ReturnReasonCard from "../../components/Settings/ReturnReason/ReturnReasonCard";
import Modal from "../../components/UI/Modal/Modal";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import ReturnResultForm from "../../components/Settings/ReturnReason/ReturnResultForm";

import {
  useGetAllReturnReasonsQuery,
  useCreateReturnReasonMutation,
  useDeleteReturnReasonMutation,
  useUpdateReturnReasonMutation,
} from "../../store/slices/api/returnReasonApiSlice";

const ReturnReasonPage = (props) => {
  const { returnReasons } = props;
  const closeAddBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const [action, setAction] = useState("");
  const [currentReason, setCurrentReason] = useState("");
  const [returnReasonId, setReturnReasonId] = useState("");

  const {
    data: returnReasonsData,
    isError: returnReasonsIsError,
    error: returnReasonsError,
  } = useGetAllReturnReasonsQuery();

  const [
    createReturnReason,
    {
      isSuccess: createReturnReasonSuccess,
      isError: createReturnReasonIsError,
      error: createReturnReasonError,
    },
  ] = useCreateReturnReasonMutation();

  const [
    deleteReturnReason,
    {
      isSuccess: deleteReturnReasonSuccess,
      isError: deleteReturnReasonIsError,
      error: deleteReturnReasonError,
    },
  ] = useDeleteReturnReasonMutation();

  const [
    updateReturnReason,
    {
      isSuccess: updateReturnReasonSuccess,
      isError: updateReturnReasonIsError,
      error: updateReturnReasonError,
    },
  ] = useUpdateReturnReasonMutation();

  const formik = useFormik({
    initialValues: {
      title: currentReason,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .min(5, "Must be minimum 5 characters")
        .max(50, "Must not be more than 50 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      if (action === "ADD") {
        await createReturnReason(values);
      }

      if (action === "UPDATE") {
        await updateReturnReason({ reasonData: values, returnReasonId });
      }
    },
  });

  useEffect(() => {
    if (returnReasonsIsError) {
      if (returnReasonsError.data?.msg) {
        toast.error(returnReasonsError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  }, [returnReasonsError, returnReasonsIsError]);

  useEffect(() => {
    if (createReturnReasonIsError) {
      if (createReturnReasonError.data?.msg) {
        toast.error(createReturnReasonError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (createReturnReasonSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Reason created successfully");
    }
  }, [
    createReturnReasonSuccess,
    createReturnReasonError,
    createReturnReasonIsError,
  ]);

  useEffect(() => {
    if (deleteReturnReasonIsError) {
      if (deleteReturnReasonError.data?.msg) {
        toast.error(deleteReturnReasonError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (deleteReturnReasonSuccess) {
      closeDeleteBtnRef.current.click();
      toast.success("Reason deleted successfully");
    }
  }, [
    deleteReturnReasonSuccess,
    deleteReturnReasonError,
    deleteReturnReasonIsError,
  ]);

  useEffect(() => {
    if (updateReturnReasonIsError) {
      if (updateReturnReasonError.data?.msg) {
        toast.error(updateReturnReasonError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (updateReturnReasonSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Reason updated successfully");
    }
  }, [
    updateReturnReasonSuccess,
    updateReturnReasonError,
    updateReturnReasonIsError,
  ]);

  if (returnReasonsIsError) {
    return <ErrorPage />;
  }

  const deleteReasonHandler = async (e) => {
    e.preventDefault();
    await deleteReturnReason(returnReasonId);
  };

  const onDeleteHandler = (id) => {
    setReturnReasonId(id);
  };

  const onAddHandler = () => {
    setAction("ADD");
    setReturnReasonId("");
    setCurrentReason("");
  };

  const onEditHandler = ({ id, title }) => {
    setAction("UPDATE");
    setReturnReasonId(id);
    setCurrentReason(title);
  };

  return (
    <section className="h-100 d-flex flex-column gap-2">
      <BackButton className="align-self-start" />
      <ReturnReasonCard
        buttonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#addReasonForm",
        }}
        deleteButtonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#deleteReasonModal",
        }}
        returnReasons={returnReasonsData?.returnReasons || returnReasons}
        onAdd={onAddHandler}
        onDelete={onDeleteHandler}
        onEdit={onEditHandler}
      />

      <Modal
        onSubmit={formik.handleSubmit}
        id="addReasonForm"
        title="Add Reason"
        ref={closeAddBtnRef}
      >
        <ReturnResultForm formik={formik} />
      </Modal>
      <Modal
        onSubmit={deleteReasonHandler}
        id="deleteReasonModal"
        title="Delete Reason"
        actionText="Delete"
        ref={closeDeleteBtnRef}
      >
        <span className="fs-6">
          Are you sure? This action is not reversible.
        </span>
      </Modal>
    </section>
  );
};

export async function getStaticProps(context) {
  const returnReasonsJsonData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/return-reason`
  );

  const returnReasonsData = await returnReasonsJsonData.json();

  return {
    props: {
      returnReasons: returnReasonsData.returnReasons,
    },
    revalidate: 10,
  };
}

export default ReturnReasonPage;
