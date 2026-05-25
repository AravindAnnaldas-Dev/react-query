import { useState } from "react";

import { Check, Pencil, Trash2, X, Plus } from "lucide-react";

import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";
import { useDeleteUser } from "./hooks/useDeleteUser";
import { useUpdateUser } from "./hooks/useUpdateUser";

const App = () => {
  // FETCH USERS
  const { data: users, isLoading, isError } = useUsers();

  // MUTATIONS
  const createMutation = useCreateUser();

  const updateMutation = useUpdateUser();

  const deleteMutation = useDeleteUser();

  // CREATE USER STATE
  const [newUserName, setNewUserName] = useState("");

  // EDIT USER STATES
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // ADD USER
  const handleAddUser = () => {
    if (!newUserName.trim()) return;

    createMutation.mutate(
      {
        name: newUserName,
        email: `${newUserName}@gmail.com`,
      },
      {
        onSuccess: () => {
          setNewUserName("");
        },
      },
    );
  };

  // DELETE USER
  const handleDeleteUser = (id: number) => {
    deleteMutation.mutate(id);
  };

  // START EDIT
  const handleStartEdit = (id: number, currentName: string) => {
    setEditingUserId(id);

    setEditingName(currentName);
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingUserId(null);

    setEditingName("");
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (!editingName.trim()) return;

    if (!editingUserId) return;

    updateMutation.mutate(
      {
        id: editingUserId,
        name: editingName,
      },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      },
    );
  };

  // LOADING
  if (isLoading) {
    return <div className="p-4">Fetching Users...</div>;
  }

  // ERROR
  if (isError) {
    return <div className="p-4">Error Fetching Users...</div>;
  }

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {/* ADD USER */}
      <div className="flex items-center gap-2">
        <input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter user name"
          className="border rounded px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddUser();
            }
          }}
        />

        <button
          onClick={handleAddUser}
          disabled={createMutation.isPending}
          className="h-10 px-4 border rounded flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />

          {createMutation.isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {/* USERS LIST */}
      <div className="flex flex-col gap-3">
        {users?.map((user) => {
          const isEditing = editingUserId === user.id;

          return (
            <div key={user.id} className="flex items-center gap-3">
              {/* NAME / INPUT */}
              {isEditing ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  className="border rounded px-2 py-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveEdit();
                    }
                  }}
                />
              ) : (
                <div className="w-40 truncate">{user.name}</div>
              )}

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    {/* SAVE */}
                    <button
                      onClick={handleSaveEdit}
                      disabled={updateMutation.isPending}
                      className="size-7 border rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <Check size={16} color="green" />
                    </button>

                    {/* CANCEL */}
                    <button
                      onClick={handleCancelEdit}
                      className="size-7 border rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <X size={16} color="red" />
                    </button>
                  </>
                ) : (
                  <>
                    {/* EDIT */}
                    <button
                      onClick={() => handleStartEdit(user.id, user.name)}
                      className="size-7 border rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteMutation.isPending}
                      className="size-7 border rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 size={16} color="red" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
