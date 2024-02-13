import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/userService';
import { useUserStore } from '../stores/useUserStore';

export const useFetchAndUpdateUsers = () => {
    const { data: users } = useQuery('users', fetchUsers);
    const setUsers = useUserStore(state => state.setUsers);

    useEffect(() => {
        if (users) {
            setUsers(users);
        }
    }, [users, setUsers]);
};