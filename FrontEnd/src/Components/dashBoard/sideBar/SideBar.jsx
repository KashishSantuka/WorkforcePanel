import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="Navbar">
      <section className="LeftSection">
        <Link to="/homePage">Home</Link>
        <Link to="/employeList">EmployeList</Link>
        <Link to="/createEmploye">CreateEmploye</Link>
        <section className="RightSection">
          <button onClick={handleLogout}>Logout</button>
        </section>
      </section>
    </div>
  );
};

export default SideBar;
