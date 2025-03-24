import { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";
import useSocketFile from "../blackboard/customHooks/websocket";
const UserGrid = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {ws}=useSocketFile();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchUsers = async () => {
        if (!search) {
          setUsers([]);
          return;
        }
        setLoading(true);
        try {
          const { data } = await axios.get(
            `http://localhost:5000/getUsers/?user=${search}`,
            { withCredentials: true }
          );
          console.log(data);
          setUsers(data || []);
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        }
        setLoading(false);
      };

      fetchUsers();
    }, 500); // Delay of 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="user-list">
      <input
        type="text"
        className={`search-bar ${search ? "search-active" : ""}`}
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="no-files-text">No results found</p>
      ) : (
        <div className="user-list-container">
          {users.map((user, index) => (
            <div key={index} className="user-item wider-box">
              <div className="user-info">
                <div className="user-avatar">
                  {user.image ? <img src={user.image} alt={user.username} /> : user.username[0]}
                </div>
                <div className="user-details">
                  <h3>{user.username}</h3>
                  <p>{user.role}</p>
                  <p className="user-email">{user.email || "No email available"}</p> {/* Email added */}
                </div>
              </div>
              {user.status && <span className="user-status">{user.status}</span>}
              <button className="connect-button"
              
              onClick={()=>{
                console.log(ws);
              
                ws.send('request for connection send');
              }}
              
              >Connect</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGrid;
