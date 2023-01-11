import Image from "next/image";
import { useRef } from "react";

import { formatDate } from "../../../helpers/time";

import styles from "./ProfileCard.module.css";

const ProfileCard = (props) => {
  const { user, buttonProps, onRemoveImage, onUploadImage } = props;
  const imageInputRef = useRef(null);

  const profileImageClickHandler = () => {
    imageInputRef.current.click();
  };
  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title">Personal Information</h4>
            <button
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Edit Information
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              <div
                onClick={profileImageClickHandler}
                className={`mx-auto pointer position-relative ${styles.profileImageContainer}`}
              >
                {user.profileImageId ? (
                  <button
                    onClick={onRemoveImage}
                    type="button"
                    className="btn-close position-absolute top-1 end-0 rounded-circle text-light"
                  ></button>
                ) : null}
                <Image
                  priority={true}
                  src={user.profileImage || "/profile-placeholder.png"}
                  width={80}
                  height={80}
                  className={styles.profileImage}
                  alt="profile image"
                />
              </div>
              <input
                ref={imageInputRef}
                onChange={onUploadImage}
                type="file"
                name="profileImage"
                id="profileImage"
                className="d-none"
              />
              <div className="d-flex flex-column gap-2">
                <ul className="list-group">
                  <li className="list-group-item no-border">
                    <span className="fw-semibold">Name: </span>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </li>
                  <li className="list-group-item no-border">
                    <span className="fw-semibold">Email: </span>
                    <span>{user.email}</span>
                  </li>
                  <li className="list-group-item no-border">
                    <span className="fw-semibold">Contact: </span>
                    <span>{user.contactNo}</span>
                  </li>
                  <li className="list-group-item no-border">
                    <span className="fw-semibold">Gender: </span>
                    <span className="capitalize">
                      {user.gender || "Not set"}
                    </span>
                  </li>
                  <li className="list-group-item no-border">
                    <span className="fw-semibold">DOB: </span>
                    <span>{user.dob ? formatDate(user.dob) : "Not set"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
