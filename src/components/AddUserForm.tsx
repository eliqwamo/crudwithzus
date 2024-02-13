import React, { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../services/userService';
import { useUserStore } from '../stores/useUserStore';

const AddUserForm: React.FC = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const addUser = useUserStore((state) => state.addUser);

  const { mutate, isLoading, error } = useMutation(createUser, {
    onSuccess: (data) => {
      addUser({
        id: data.id, // Make sure your createUser API returns the id of the newly created user
        firstName,
        lastName,
        email,
        phone,
        position,
      });

      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setPosition('')
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ firstName, lastName, email, phone, position });
  }

  function isError(error: unknown): error is Error {
    return error instanceof Error;
  }

  return (
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

        <button type="submit" disabled={isLoading} className="btn btn-success btn-lg">Add New Employee</button>
        {isError(error) && <p>Error adding user: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddUserForm;
