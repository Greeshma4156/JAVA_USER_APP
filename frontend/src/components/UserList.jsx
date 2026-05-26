import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  console.log("UserList loaded");

  async function getUsers() {
    console.log("Calling API...");

    try {
      let res = await API.get("/user-api/users");

      console.log("Response received:", res);
      setUsers(res.data.payload);
    } catch (err) {
      console.log("Error:", err);
      setError(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  getUsers();
}, []);

  const gotoUser = (userObj) => {
    navigate("/user", { state: userObj });
  };

  if (loading) {
    return (
      <p className="text-center text-orange-600 text-3xl">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 text-3xl">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">List of Users</h1>
        <div className="text-gray-600 bg-gray-100 rounded-full px-4 py-1.5 text-sm font-semibold border border-gray-200 shadow-sm">
          {users.length} {users.length === 1 ? 'User' : 'Users'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {users.map((user) => (
          <div
            key={user._id || user.email}
            onClick={() => gotoUser(user)}
            className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {user.name}
                </h3>
                <p className="text-sm font-medium text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            {(user.dateOfBirth || user.mobileNumber) && (
              <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                {user.mobileNumber && (
                   <div className="flex flex-col">
                     <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Mobile</span>
                     <span className="text-sm text-gray-700 font-medium truncate">{user.mobileNumber}</span>
                   </div>
                )}
                {user.dateOfBirth && (
                   <div className="flex flex-col">
                     <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">DOB</span>
                     <span className="text-sm text-gray-700 font-medium truncate">
                        {new Date(user.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                     </span>
                   </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {users.length === 0 && !loading && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-8">
          <p className="text-gray-500 text-lg font-medium">No users found.</p>
        </div>
      )}
    </div>
  );
}

export default UserList;