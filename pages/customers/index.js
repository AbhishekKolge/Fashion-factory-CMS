import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import UsersCard from "../../components/Users/UsersCard";
import Modal from "../../components/UI/Modal/Modal";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";
import UsersForm from "../../components/Users/UsersForm";
import UsersFilterForm from "../../components/Users/UsersFilterForm";
import Pagination from "../../components/UI/Pagination/Pagination";
import LoadingPage from "../../components/UI/LoadingPage/LoadingPage";

import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useRemoveUserMutation,
} from "../../store/slices/api/userApiSlice";

const UsersPage = (props) => {
  const closeAddBtnRef = useRef(null);
  const closeDeleteBtnRef = useRef(null);
  const [queries, setQueries] = useState({
    role: "",
    search: "",
    page: 1,
  });
  const [currentStatus, setCurrentStatus] = useState({
    status: "",
    authorized: false,
  });
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: usersData,
    isError: usersIsError,
    error: usersError,
    isLoading: usersLoading,
  } = useGetAllUsersQuery({ ...queries });

  const [
    removeUser,
    {
      isSuccess: removeUserSuccess,
      isError: removeUserIsError,
      error: removeUserError,
    },
  ] = useRemoveUserMutation();

  const [
    updateUserStatus,
    {
      isSuccess: updateUserStatusSuccess,
      isError: updateUserStatusIsError,
      error: updateUserStatusError,
    },
  ] = useUpdateUserStatusMutation();

  const formik = useFormik({
    initialValues: {
      status: currentStatus.status,
      authorized: currentStatus.authorized,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      status: Yup.string().oneOf(["ACTIVE", "LOCKED"]).optional(),
      authorized: Yup.boolean().optional(),
    }),
    onSubmit: async (values) => {
      const statusData = { ...values };

      if (!isAdmin) {
        delete statusData.authorized;
      }

      await updateUserStatus({ statusData, userId });
    },
  });

  useEffect(() => {
    if (usersIsError) {
      if (usersError.data?.msg) {
        toast.error(usersError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  }, [usersError, usersIsError]);

  useEffect(() => {
    if (removeUserIsError) {
      if (removeUserError.data?.msg) {
        toast.error(removeUserError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (removeUserSuccess) {
      closeDeleteBtnRef.current.click();
      toast.success("User deleted successfully");
    }
  }, [removeUserSuccess, removeUserError, removeUserIsError]);

  useEffect(() => {
    if (updateUserStatusIsError) {
      if (updateUserStatusError.data?.msg) {
        toast.error(updateUserStatusError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (updateUserStatusSuccess) {
      formik.resetForm();
      closeAddBtnRef.current.click();
      toast.success("User status updated successfully");
    }
  }, [updateUserStatusSuccess, updateUserStatusError, updateUserStatusIsError]);

  if (usersLoading) {
    return <LoadingPage />;
  }

  if (usersIsError) {
    return <ErrorPage />;
  }

  const deleteUserHandler = async (e) => {
    e.preventDefault();
    await removeUser(userId);
  };

  const onDeleteHandler = (id) => {
    setUserId(id);
  };

  const onEditHandler = ({ id, userStatusDetails, isAdmin }) => {
    setUserId(id);
    setCurrentStatus(userStatusDetails);
    setIsAdmin(isAdmin);
  };

  return (
    <section className="h-100 d-flex flex-column gap-2">
      <UsersFilterForm queries={queries} setQueries={setQueries} />
      <UsersCard
        buttonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#updateUserStatusForm",
        }}
        deleteButtonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#deleteUserModal",
        }}
        users={usersData?.users}
        totalUsers={usersData?.totalUsers || 0}
        onDelete={onDeleteHandler}
        onEdit={onEditHandler}
      />
      <Pagination
        numOfPages={usersData?.numOfPages}
        queries={queries}
        setQueries={setQueries}
      />

      <Modal
        onSubmit={formik.handleSubmit}
        id="updateUserStatusForm"
        title="Update Status"
        ref={closeAddBtnRef}
      >
        <UsersForm isAdmin={isAdmin} formik={formik} />
      </Modal>
      <Modal
        onSubmit={deleteUserHandler}
        id="deleteUserModal"
        title="Delete User"
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

export default UsersPage;
