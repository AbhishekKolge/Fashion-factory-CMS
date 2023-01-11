import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import BackButton from "../../components/UI/Button/BackButton";
import SizeCard from "../../components/Settings/Size/SizeCard";
import Modal from "../../components/UI/Modal/Modal";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import SizeForm from "../../components/Settings/Size/SizeForm";

import {
  useGetAllSizesQuery,
  useCreateSizeMutation,
  useDeleteSizeMutation,
  useUpdateSizeMutation,
} from "../../store/slices/api/sizeApiSlice";

const sizePage = (props) => {
  const { sizes } = props;
  const closeAddBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const [action, setAction] = useState("");
  const [currentSize, setCurrentSize] = useState(null);
  const [sizeId, setSizeId] = useState("");

  const {
    data: sizesData,
    isError: sizesIsError,
    error: sizesError,
  } = useGetAllSizesQuery();

  const [
    createSize,
    {
      isSuccess: createSizeSuccess,
      isError: createSizeIsError,
      error: createSizeError,
    },
  ] = useCreateSizeMutation();

  const [
    deleteSize,
    {
      isSuccess: deleteSizeSuccess,
      isError: deleteSizeIsError,
      error: deleteSizeError,
    },
  ] = useDeleteSizeMutation();

  const [
    updateSize,
    {
      isSuccess: updateSizeSuccess,
      isError: updateSizeIsError,
      error: updateSizeError,
    },
  ] = useUpdateSizeMutation();

  const formik = useFormik({
    initialValues: {
      value: currentSize || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      value: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      if (action === "ADD") {
        await createSize(values);
      }

      if (action === "UPDATE") {
        await updateSize({ sizeData: values, sizeId });
      }
    },
  });

  useEffect(() => {
    if (sizesIsError) {
      if (sizesError.data?.msg) {
        toast.error(sizesError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  }, [sizesError, sizesIsError]);

  useEffect(() => {
    if (createSizeIsError) {
      if (createSizeError.data?.msg) {
        toast.error(createSizeError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (createSizeSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Size created successfully");
    }
  }, [createSizeSuccess, createSizeError, createSizeIsError]);

  useEffect(() => {
    if (deleteSizeIsError) {
      if (deleteSizeError.data?.msg) {
        toast.error(deleteSizeError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (deleteSizeSuccess) {
      closeDeleteBtnRef.current.click();
      toast.success("Size deleted successfully");
    }
  }, [deleteSizeSuccess, deleteSizeError, deleteSizeIsError]);

  useEffect(() => {
    if (updateSizeIsError) {
      if (updateSizeError.data?.msg) {
        toast.error(updateSizeError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (updateSizeSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Size updated successfully");
    }
  }, [updateSizeSuccess, updateSizeError, updateSizeIsError]);

  if (sizesIsError) {
    return <ErrorPage />;
  }

  const deleteSizeHandler = async (e) => {
    e.preventDefault();
    await deleteSize(sizeId);
  };

  const onDeleteHandler = (id) => {
    setSizeId(id);
  };

  const onAddHandler = () => {
    setAction("ADD");
    setSizeId("");
    setCurrentSize(null);
  };

  const onEditHandler = ({ id, value }) => {
    setAction("UPDATE");
    setSizeId(id);
    setCurrentSize(value);
  };

  return (
    <section className="h-100 d-flex flex-column gap-2">
      <BackButton className="align-self-start" />
      <SizeCard
        buttonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#addSizeForm",
        }}
        deleteButtonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#deleteSizeModal",
        }}
        sizes={sizesData?.sizes || sizes}
        onAdd={onAddHandler}
        onDelete={onDeleteHandler}
        onEdit={onEditHandler}
      />

      <Modal
        onSubmit={formik.handleSubmit}
        id="addSizeForm"
        title="Add Size"
        ref={closeAddBtnRef}
      >
        <SizeForm formik={formik} />
      </Modal>
      <Modal
        onSubmit={deleteSizeHandler}
        id="deleteSizeModal"
        title="Delete Size"
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
  const sizesJsonData = await fetch(`${process.env.NEXT_PUBLIC_URL}/size`);

  const sizesData = await sizesJsonData.json();

  return {
    props: {
      sizes: sizesData.sizes,
    },
    revalidate: 10,
  };
}

export default sizePage;
