import useFetchUser from '../hooks/useFetchUser';
import LogoutButton from '../components/LogoutButton';
import '../styles/UserProfile.css'

const UserProfile = () => {
  const { user, loading, error } = useFetchUser();

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <div className="userHeader">
        <h2>User Profile</h2>
        <img src={user.image} alt={user.firstName} />
        <LogoutButton />
      </div>
      <div className="userInfo">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address.address}, {user.address.city}
        </p>
        <p>
          <strong>Purchase History:</strong> Coming soon!
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
