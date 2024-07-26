import React, { useState, useEffect } from "react";
import "../App.css";
import UserInfo from "../Components/UserInfo";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import protectedRoute from "../Utility/ProtectedRoute";
import { Atom } from "react-loading-indicators";

const Users = () => {
  const navigate = useNavigate();

  const [usersData, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/vms/employees");
        setUsers(res.data);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [usersData]); // Fetch users on initial load

  const deleteUser = async (Id_No) => {
    try {
      await axios.delete(
        `http://localhost:3000/vms/employees/delete-user/${Id_No}`
      );
      setUsers(usersData.filter((user) => user.Id_No !== Id_No));
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  const editUser = (Id_No) => {
    setEditingUserId(Id_No);
    navigate(`/edit-user/${Id_No}`);
  };

  const cancelEdit = () => {
    setEditingUserId(null); // Clear editing state
  };

  const saveUserChanges = async (updatedUserData) => {
    try {
      await axios.put(
        `http://localhost:3000/vms/employees/update-user/${updatedUserData.Id_No}`,
        updatedUserData
      );
      // Update the local state with the updated user data
      const updatedUsers = usersData.map((user) =>
        user.Id_No === updatedUserData.Id_No ? updatedUserData : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null); // Clear editing state after successful update
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    // Handle error notifications based on different error statuses
    let errorMessage = "Something went wrong";
    if (error.response) {
      const status = error.response.status;
      if (status === 500) errorMessage = "Server Error";
      else if (status === 503) errorMessage = "Service Unavailable";
      else if (status === 400 || status === 409 || status === 408)
        errorMessage = "Network Error";
    }
    showNotification(errorMessage);
  };

  const showNotification = (message) => {
    const badgeNotification = document.getElementById("badgeNotification");
    badgeNotification.innerHTML = message;
    badgeNotification.style.display = "block";
    setTimeout(() => {
      badgeNotification.style.display = "none";
    }, 3000);
  };

  return (
    <>
      {protectedRoute("Admin") ? (
        <div className="container body-wrapper">
          <h3 className="page-title mb-4 d-flex justify-content-center">
            Employees
          </h3>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>

            {loading && (
              <div className="d-flex justify-content-center align-items-center  m-5">
                <Atom
                  color="#32cd32"
                  size="medium"
                  text="Loading Data..."
                  textColor="red"
                />
              </div>
            )}
            {usersData.length > 0
              ? usersData.map((user, index) => (
                  <UserInfo
                    key={index}
                    fullName={user.name}
                    Id_No={user.Id_No}
                    email={user.email}
                    role={user.role}
                    profilePic={`http://localhost:3000/${user.profilePic}`}
                    deleteUser={deleteUser}
                    editUser={editUser}
                    isEditing={editingUserId === user.Id_No}
                    onSave={saveUserChanges}
                    onCancelEdit={cancelEdit}
                  />
                ))
              : !loading &&
                usersData.length === 0 && (
                  <h3 className="d-flex justify-content-center align-items-center flex-column text-center">
                    No Employees Found!
                  </h3>
                )}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Users;
