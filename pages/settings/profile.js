import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";

import {
  useShowMeQuery,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
  useUpdateProfileMutation,
} from "../../store/slices/api/userApiSlice";

import ProfileCard from "../../components/User/Profile/ProfileCard";
import BackButton from "../../components/UI/Button/BackButton";
import LoadingPage from "../../components/UI/LoadingPage/LoadingPage";
import ProfileForm from "../../components/User/Profile/ProfileForm";
import Modal from "../../components/UI/Modal/Modal";
import ErrorPage from "../../components/UI/ErrorPage/ErrorPage";

const ProfilePage = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const closeEditProfileButton = useRef(null);

  const {
    data: profileData,
    isLoading: profileLoading,
    isSuccess: profileSuccess,
    isError: profileIsError,
    error: profileError,
  } = useShowMeQuery(
    {},
    {
      skip: isLoggedIn ? false : true,
    }
  );

  const [
    uploadProfileImage,
    {
      isSuccess: uploadProfileImageSuccess,
      isError: uploadProfileImageIsError,
      error: uploadProfileImageError,
      isLoading: uploadProfileImageIsLoading,
    },
  ] = useUploadProfileImageMutation();

  const [
    removeProfileImage,
    {
      isSuccess: removeProfileImageSuccess,
      isError: removeProfileImageIsError,
      isLoading: removeProfileImageLoading,
      error: removeProfileImageError,
    },
  ] = useRemoveProfileImageMutation();

  const [
    updateProfile,
    {
      isSuccess: updateProfileSuccess,
      isError: updateProfileIsError,
      error: updateProfileError,
    },
  ] = useUpdateProfileMutation();

  const formik = useFormik({
    initialValues: {
      firstName: profileData?.user?.firstName || "",
      lastName: profileData?.user?.lastName || "",
      contactNo: profileData?.user?.contactNo || "",
      email: profileData?.user?.email || "",
      gender: profileData?.user?.gender || "",
      dob: profileData?.user?.dob || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(3, "Must be minimum 3 characters")
        .max(20, "Must not be more than 20 characters")
        .required("Required"),
      lastName: Yup.string()
        .trim()
        .max(20, "Must not be more than 20 characters"),
      contactNo: Yup.string()
        .trim()
        .phone("IN", "Please enter a valid contact no"),
      gender: Yup.string().oneOf(["MALE", "FEMALE"]),
      dob: Yup.date(),
    }),
    onSubmit: async (values) => {
      const userData = { ...values };
      userData.dob = userData.dob ? new Date(userData.dob) : null;
      userData.gender = userData.gender || null;
      delete userData.email;
      await updateProfile(userData);
    },
  });

  const uploadProfileImageHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    await uploadProfileImage(formData);
  };

  const removeProfileImageHandler = async (e) => {
    e.stopPropagation();
    await removeProfileImage(profileData?.user?.profileImageId);
  };

  useEffect(() => {
    if (updateProfileIsError) {
      if (updateProfileError.data?.msg) {
        toast.error(updateProfileError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (updateProfileSuccess) {
      closeEditProfileButton.current.click();
      toast.success("Profile updated successfully");
    }
  }, [updateProfileSuccess, updateProfileError, updateProfileIsError]);

  useEffect(() => {
    let uploadingToast;
    if (uploadProfileImageIsLoading) {
      uploadingToast = toast.loading(
        "Uploading profile image, please be patient"
      );
    }
    if (uploadProfileImageIsError) {
      toast.dismiss(uploadingToast);
      if (uploadProfileImageError.data?.msg) {
        toast.error(uploadProfileImageError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (uploadProfileImageSuccess) {
      toast.dismiss(uploadingToast);
      toast.success("Profile photo uploaded successfully");
    }
  }, [
    uploadProfileImageSuccess,
    uploadProfileImageError,
    uploadProfileImageIsError,
    uploadProfileImageIsLoading,
  ]);

  useEffect(() => {
    if (profileIsError) {
      if (profileError.data?.msg) {
        toast.error(profileError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  }, [profileError, profileIsError]);

  useEffect(() => {
    let removingToast;
    if (removeProfileImageLoading) {
      removingToast = toast.loading("Removing image, please be patient");
    }
    if (removeProfileImageIsError) {
      toast.dismiss(removingToast);
      if (removeProfileImageError.data?.msg) {
        toast.error(removeProfileImageError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (removeProfileImageSuccess) {
      toast.dismiss(removingToast);
      toast.success("Image deleted successfully");
    }
  }, [
    removeProfileImageIsError,
    removeProfileImageError,
    removeProfileImageSuccess,
    removeProfileImageLoading,
  ]);

  if (profileLoading) {
    return <LoadingPage />;
  }

  if (profileIsError) {
    return <ErrorPage />;
  }

  return profileSuccess && profileData ? (
    <section className="h-100 d-flex flex-column gap-2">
      <BackButton className="align-self-start" />
      <ProfileCard
        onRemoveImage={removeProfileImageHandler}
        onUploadImage={uploadProfileImageHandler}
        buttonProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#profileForm",
        }}
        user={profileData.user}
      />
      <Modal
        id="profileForm"
        title="Edit information"
        size="modal-lg"
        onSubmit={formik.handleSubmit}
        ref={closeEditProfileButton}
      >
        <ProfileForm formik={formik} />
      </Modal>
    </section>
  ) : null;
};

export default ProfilePage;
