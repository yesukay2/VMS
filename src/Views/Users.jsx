// import React from "react";
// import "../App.css";
// import UserInfo from "../Components/UserInfo";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";

// const badgeNotification = document.getElementById("badgeNotification");
// const Users = () => {
//   const [usersData, setUsers] = useState([]);

//   useEffect(() => {
//     try {
//       axios.get("http://localhost:3000/vms/employees").then((res) => {
//         return setUsers(res.data);
//       });
//     } catch (error) {
//       console.log(error);
//       if (error.response.status == 500) {
//         badgeNotification.innerHTML = "Server Error";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//       } else if (error.response.status == 503) {
//         badgeNotification.innerHTML = "Service Unavailable";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//       } else if (
//         error.response.status == 400 ||
//         error.response.status == 409 ||
//         error.response.status == 408
//       ) {
//         badgeNotification.innerHTML = "Network Error";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//       } else {
//         badgeNotification.innerHTML = "Something went wrong";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//       }
//     }
//   }, [usersData]);
//   const requireAuth = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       return false;
//     }
//     return true;
//   };

//   const deleteUser = async (Id_No) => {
//     try {
//       axios
//         .delete(`http://localhost:3000/vms/employees/delete-user/${Id_No}`)
//         .then(() => {
//           setUsers(usersData.filter((user) => user.Id_No !== Id_No));
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const editUser = (Id_No) => {

//   };
//   return (
//     <>
//       {requireAuth() ? (
//         <div className="container body-wrapper">
//           <h3 className="page-title mb-4 d-flex justify-content-center">
//             Employees
//           </h3>
//           <div className="users">
//             <div className="error-notification" id="badgeNotification"></div>
//             {usersData.length === 0 && (
//               <h3 className="d-flex justify-content-center align-items-center flex-column text-center">
//                 No Employees Found!
//               </h3>
//             )}
//             {usersData &&
//               usersData.map((user, index) => {
//                 return (
//                   <UserInfo
//                     key={index}
//                     fullName={user.name}
//                     Id_No={user.Id_No}
//                     email={user.email}
//                     role={user.role}
//                     profilePic={`http://localhost:3000/${user.profilePic}`}
//                     deleteUser={deleteUser}
//                     editUser={editUser}
//                   />
//                 );
//               })}
//           </div>
//         </div>
//       ) : (
//         <Navigate to="/" />
//       )}
//     </>
//   );
// };

// export default Users;

import React, { useState, useEffect } from "react";
import "../App.css";
import UserInfo from "../Components/UserInfo";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [usersData, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // State to track which user is being edited

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/vms/employees");
        setUsers(res.data);
      } catch (error) {
        handleApiError(error);
      }
    };
    fetchUsers();
  }, [usersData]); // Fetch users on initial load

  const requireAuth = () => {
    const token = localStorage.getItem("token");
    return !!token; // Simplified check for token existence
  };

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
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h3 className="page-title mb-4 d-flex justify-content-center">
            Employees
          </h3>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>
            {usersData.length === 0 && (
              <h3 className="d-flex justify-content-center align-items-center flex-column text-center">
                No Employees Found!
              </h3>
            )}
            {usersData.map((user, index) => (
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
            ))}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Users;
