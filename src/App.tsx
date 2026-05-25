import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "./types/types";

const App = () => {
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");

    return response?.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const addUser = async (user: User) => {
    const response = await axios.post("http://localhost:5000/users", {
      ...user,
    });

    return response?.data;
  };

  const mutation = useMutation({
    mutationFn: addUser,
  });

  const handleAddUser = () => {
    mutation.mutate({
      id: 21,
      name: "Random Name",
      email: "random@gmail.com",
      role: "Random Role",
    });
  };

  if (isLoading) return <div className="p-4">Fetching Users...</div>;

  if (error) return <div className="p-4">Error Fetching Users...</div>;

  return (
    <div className="w-full flex items-start justify-start gap-2">
      <div className="w-1/2 p-4 flex flex-col items-start justify-start gap-2 border-0 border-r">
        {data?.map((user: User) => (
          <div key={user?.id}>{user?.name}</div>
        ))}
      </div>

      <div className="w-1/2 p-4 flex items-start justify-start gap-2 self-stretch relative">
        <button
          className="border px-4 py-2 rounded-lg cursor-pointer transition-all sticky top-4 left-0 hover:bg-gray-200"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default App;
