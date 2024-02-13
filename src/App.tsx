import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddUserForm from "./components/AddUserForm";
import UsersList from "./components/UsersList";
import { useFetchAndUpdateUsers } from './hooks/useFetchAndUpdateUsers';

// Define your query client outside of the component to avoid recreating it on every render
const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
};

const AppContent: React.FC = () => {
    useFetchAndUpdateUsers(); // This ensures it's called within the QueryClientProvider context

    return (
        <div className="container">
            <div className="row" style={{paddingTop:50}}>
                <div className="col-lg-4">
                    <AddUserForm />
                </div>
                <div className="col-lg-8">
                    <UsersList />
                </div>
            </div>
        </div>
    );
};

export default App;
