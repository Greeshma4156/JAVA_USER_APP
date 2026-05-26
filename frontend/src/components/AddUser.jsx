import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import API from "../api";

function AddUser() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onUserCreate = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/user-api/users", newUser);

      if (res.status === 201) {
        navigate("/users-list");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
    <div className="text-center">
      <h1 className="text-5xl text-gray-600">Add New User</h1>

      <form
        onSubmit={handleSubmit(onUserCreate)}
        className="max-w-60 mx-auto mt-10"
      >
        <input
          type="text"
          {...register("name")}
          className="mb-5 border w-full"
          placeholder="Name"
        />

        <input
          type="text"
          {...register("email")}
          className="mb-10 border w-full"
          placeholder="Email"
        />

        <input
          type="date"
          {...register("dateOfBirth")}
          className="mb-10 border w-full"
        />

        <input
          type="number"
          {...register("mobileNumber")}
          className="mb-10 border w-full"
          placeholder="Mobile Number"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;