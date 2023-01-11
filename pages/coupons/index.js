import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import CouponCard from "../../components/Coupon/CouponCard";
import Modal from "../../components/UI/Modal/Modal";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import CouponForm from "../../components/Coupon/CouponForm";
import CouponFilterForm from "../../components/Coupon/CouponFilterForm";
import Pagination from "../../components/UI/Pagination/Pagination";

import {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} from "../../store/slices/api/couponApiSlice";

const CouponsPage = (props) => {
  const { coupons, numOfPages, totalCoupons } = props;
  const closeAddBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const [action, setAction] = useState("");
  const [queries, setQueries] = useState({
    search: "",
    type: "",
    status: "",
    sort: "latest",
    redemptionSort: "",
    page: 1,
  });
  const [currentCoupon, setCurrentCoupon] = useState({
    type: "",
    amount: "",
    code: "",
    startTime: "",
    expiryTime: "",
    valid: "",
    maxRedemptions: "",
  });
  const [couponId, setCouponId] = useState("");

  const {
    data: couponsData,
    isError: couponsIsError,
    error: couponsError,
  } = useGetAllCouponsQuery({ ...queries });

  const [
    createCoupon,
    {
      isSuccess: createCouponSuccess,
      isError: createCouponIsError,
      error: createCouponError,
    },
  ] = useCreateCouponMutation();

  const [
    deleteCoupon,
    {
      isSuccess: deleteCouponSuccess,
      isError: deleteCouponIsError,
      error: deleteCouponError,
    },
  ] = useDeleteCouponMutation();

  const [
    updateCoupon,
    {
      isSuccess: updateCouponSuccess,
      isError: updateCouponIsError,
      error: updateCouponError,
    },
  ] = useUpdateCouponMutation();

  const formik = useFormik({
    initialValues: {
      type: currentCoupon.type,
      amount: currentCoupon.amount,
      code: currentCoupon.code,
      startTime: currentCoupon.startTime,
      expiryTime: currentCoupon.expiryTime,
      valid: currentCoupon.valid,
      maxRedemptions: currentCoupon.maxRedemptions,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string().oneOf(["PERCENTAGE", "FIXED"]).optional(),
      amount: Yup.number().required(),
      code: Yup.string().min(3).max(10).required(),
      startTime: Yup.date().optional(),
      expiryTime: Yup.date().required(),
      valid: Yup.boolean().optional(),
      maxRedemptions: Yup.number().min(1).required(),
    }),
    onSubmit: async (values) => {
      const couponDetails = { ...values };
      if (action === "ADD") {
        if (!couponDetails.type) {
          delete couponDetails.type;
        }
        if (!couponDetails.startTime) {
          delete couponDetails.startTime;
        } else {
          couponDetails.startTime = new Date(couponDetails.startTime);
        }
        if (couponDetails.valid === "" || couponDetails.valid === null) {
          delete couponDetails.valid;
        }
        couponDetails.expiryTime = new Date(couponDetails.expiryTime);
        await createCoupon(couponDetails);
      }

      if (action === "UPDATE") {
        delete couponDetails.type;
        delete couponDetails.amount;
        delete couponDetails.code;
        delete couponDetails.startTime;
        couponDetails.expiryTime = new Date(couponDetails.expiryTime);
        await updateCoupon({ couponData: couponDetails, couponId });
      }
    },
  });

  useEffect(() => {
    if (couponsIsError) {
      if (couponsError.data?.msg) {
        toast.error(couponsError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  }, [couponsError, couponsIsError]);

  useEffect(() => {
    if (createCouponIsError) {
      if (createCouponError.data?.msg) {
        toast.error(createCouponError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (createCouponSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Coupon created successfully");
    }
  }, [createCouponSuccess, createCouponError, createCouponIsError]);

  useEffect(() => {
    if (deleteCouponIsError) {
      if (deleteCouponError.data?.msg) {
        toast.error(deleteCouponError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (deleteCouponSuccess) {
      closeDeleteBtnRef.current.click();
      toast.success("Coupon deleted successfully");
    }
  }, [deleteCouponSuccess, deleteCouponError, deleteCouponIsError]);

  useEffect(() => {
    if (updateCouponIsError) {
      if (updateCouponError.data?.msg) {
        toast.error(updateCouponError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (updateCouponSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("Coupon updated successfully");
    }
  }, [updateCouponSuccess, updateCouponError, updateCouponIsError]);

  if (couponsIsError) {
    return <ErrorPage />;
  }

  const deleteCouponHandler = async (e) => {
    e.preventDefault();
    await deleteCoupon(couponId);
  };

  const onDeleteHandler = (id) => {
    setCouponId(id);
  };

  const onAddHandler = () => {
    setAction("ADD");
    setCouponId("");
    setCurrentCoupon({
      type: "",
      amount: "",
      code: "",
      startTime: "",
      expiryTime: "",
      valid: "",
      maxRedemptions: "",
    });
  };

  const onEditHandler = ({ id, couponDetails }) => {
    setAction("UPDATE");
    setCouponId(id);
    setCurrentCoupon(couponDetails);
  };

  return (
    <section className="h-100 d-flex flex-column gap-2">
      <CouponFilterForm queries={queries} setQueries={setQueries} />
      <CouponCard
        buttonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#addCouponForm",
        }}
        deleteButtonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#deleteCouponModal",
        }}
        coupons={couponsData?.coupons || coupons}
        totalCoupons={couponsData?.totalCoupons || 0}
        onAdd={onAddHandler}
        onDelete={onDeleteHandler}
        onEdit={onEditHandler}
      />
      <Pagination
        numOfPages={couponsData?.numOfPages || numOfPages}
        queries={queries}
        setQueries={setQueries}
      />

      <Modal
        onSubmit={formik.handleSubmit}
        id="addCouponForm"
        title="Add Coupon"
        ref={closeAddBtnRef}
      >
        <CouponForm action={action} formik={formik} />
      </Modal>
      <Modal
        onSubmit={deleteCouponHandler}
        id="deleteCouponModal"
        title="Delete Coupon"
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
  const couponsJsonData = await fetch(`${process.env.NEXT_PUBLIC_URL}/coupon`);

  const couponsData = await couponsJsonData.json();

  return {
    props: {
      coupons: couponsData.coupons,
      totalCoupons: couponsData.totalCoupons,
      numOfPages: couponsData.numOfPages,
    },
    revalidate: 10,
  };
}

export default CouponsPage;
