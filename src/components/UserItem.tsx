import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteUser,updateUser } from "../services/userService";
import { useUserStore } from "../stores/useUserStore";
import { User } from "../stores/useUserStore";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {

  const [isEditView, setIsEditView] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [position, setPosition] = useState(user.position);


  const updateMutation = useMutation(({ id, update }:
     { id: string; update: Partial<Omit<User, 'id'>> }) =>
      updateUser(id, update), {
    onSuccess: () => {
        // Update the user in the Zustand store
        useUserStore.getState().updateUser(user.id, {
            firstName,
            lastName,
            email,
            phone,
            position,
        });
        setIsEditView(false); // Close the edit view on success
    },
});


  const deleteUserMutation = useMutation(() => deleteUser(user.id), {
    onSuccess: () => {
      useUserStore.getState().deleteUser(user.id);
    },
  });

  const handleDelete = () => {
    deleteUserMutation.mutate();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate({
      id: user.id,
      update: {
        firstName,
        lastName,
        email,
        phone,
        position,
      },
    });
};


  return (
    <>
      {isEditView ? (
        <>
            <div>



    <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>First name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Last name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>Phone</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <label>Position</label>
        </div>

        <button type="submit" disabled={updateMutation.isLoading} className="btn btn-success btn-lg">Update User</button>
            {updateMutation.isError && <p>Error updating user: {(updateMutation.error as Error).message}</p>}
            <button className="btn btn-warning btn-sm" onClick={() => setIsEditView(!isEditView)}>Cancel</button>
      </form>



            <button className="btn btn-success btn-sm" onClick={() => {}}>Update</button>
            <button className="btn btn-warning btn-sm" onClick={() => setIsEditView(!isEditView)}>Cancle</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>
              {user.firstName} {user.lastName} | {user.email} | {user.position}
            </p>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
            <button className="btn btn-warning btn-sm" onClick={() => setIsEditView(!isEditView)}>Edit</button>
          </div>
        </>
      )}
    </>
  );
};

export default UserItem;
