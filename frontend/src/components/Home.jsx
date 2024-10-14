import { useContext } from "react";
import UserContext from "../context/UserContext";

const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Admin Dashboard</h1>
            {/* Check if user exists and then render the username */}
            {user ? (
                <div className="alert alert-info mt-4">
                    <strong>Username:</strong> {user.username}
                </div>
            ) : (
                <div className="alert alert-danger mt-4">
                    No user information available
                </div>
            )}
        </div>
    );
}

export default Home;
