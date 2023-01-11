import { useSelector } from "react-redux";

import styles from "./UsersCard.module.css";

const UsersCard = (props) => {
  const {
    users,
    totalUsers,
    onEdit,
    onDelete,
    buttonProps,
    deleteButtonProps,
  } = props;

  const { userId } = useSelector((state) => state.auth);

  return (
    <div className="row">
      <div className="fs-8">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title">{`Users (${totalUsers})`}</h4>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {users.length ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Name
                      </th>
                      <th scope="col" className="text-center">
                        Contact No.
                      </th>
                      <th scope="col" className="text-center">
                        Email
                      </th>
                      <th scope="col" className="text-center">
                        Role
                      </th>
                      <th scope="col" className="text-center">
                        isVerified
                      </th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                      <th scope="col" className="text-center">
                        Authorized
                      </th>
                      <th scope="col" className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td className="text-center">
                            {`${user.firstName} ${
                              user.lastName ? user.lastName : ""
                            }`}
                          </td>
                          <td className="text-center">{user.contactNo}</td>
                          <td className="text-center">{user.email}</td>
                          <td className="text-center">{user.role}</td>
                          <td className="text-center">
                            {user.isVerified ? (
                              <span className="text-success">
                                <i className="bi bi-check2"></i>
                              </span>
                            ) : (
                              <span className="text-danger">
                                <i className="bi bi-x-lg"></i>
                              </span>
                            )}
                          </td>
                          <td className="text-center">{user.status}</td>
                          <td className="text-center">
                            {user.authorized ? (
                              <span className="text-success">
                                <i className="bi bi-check2"></i>
                              </span>
                            ) : (
                              <span className="text-danger">
                                <i className="bi bi-x-lg"></i>
                              </span>
                            )}
                          </td>
                          <td className="d-flex gap-2 justify-content-center">
                            {userId !== user.id ? (
                              <>
                                <button
                                  onClick={onEdit.bind(this, {
                                    id: user.id,
                                    userStatusDetails: {
                                      status: user.status,
                                      authorized: user.authorized,
                                    },
                                    isAdmin: user.role === "ADMIN",
                                  })}
                                  {...buttonProps}
                                  className="btn btn-warning text-light btn-sm"
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button
                                  {...deleteButtonProps}
                                  onClick={onDelete.bind(this, user.id)}
                                  className="btn btn-danger text-light btn-sm"
                                >
                                  <i className="bi bi-trash3-fill"></i>
                                </button>
                              </>
                            ) : (
                              <span>Not applicable</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <span>No users found</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
