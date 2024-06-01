import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "../features/todos/todosSlice";
import { useState } from "react";

function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleCreate = () => {
    setShowForm(true);
    setIsEditMode(false);
    setFormData({
      id: "",
      name: "",
      email: "",
    });
  };

  const handleEdit = (user) => {
    setShowForm(true);
    setIsEditMode(true);
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateUser(formData));
    } else {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
      };
      dispatch(addUser(newUser));
    }
    setShowForm(false);
    setFormData({
      id: "",
      name: "",
      email: "",
    });
  };

  // const handleEdit = (id) => {
  //   const updatedUser = {
  //     id,
  //     name: "Updated User",
  //     email: "updateduser@example.com",
  //   };
  //   dispatch(updateUser(updatedUser));
  // };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold text-3xl">This is CRUD Application</h2>
      <div>
        <button
          className="bg-emerald-500 px-4 py-3 rounded-md font-bold text-white shadow-md"
          onClick={handleCreate}
        >
          Create+
        </button>
      </div>
      {showForm ? (
        <div className="flex items-center justify-center">
          <form onSubmit={handleFormSubmit} className="bg-emerald-300 mt-[4rem] border border-4 py-4 w-[350px] shadow-lg">
          <div className="flex flex-col gap-3">
            <label className="font-bold">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="ml-2 border border-black rounded p-2"
                required
              />
            </label>
            <label className="font-bold">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="ml-2 border border-black rounded p-2"
                required
              />
            </label>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        </div>
      ) : (
        <table className="table-fixed w-full border-collapse border border-gray-200 mt-4 shadow-md shadow-slate-700 hover:shadow-slate-800">
          <thead>
            <tr className="bg-lime-600 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    aria-label="Edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-white px-2 py-1 rounded-md border-[3px]"
                    aria-label="Delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
