import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Styled Components
const HeaderContainer = styled.nav`
  background-color: #343a40;
  padding: 1rem;
`;

const Brand = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-right: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #495057;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c82333;
  }
`;

const DropdownSelect = styled.select`
  background-color: #f8f9fa;
  color: #343a40;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const DropdownOption = styled.option`
  background-color: #f8f9fa;
  color: #343a40;
`;

// Media Query for Mobile
const media = {
  mobile: `@media (max-width: 768px) {
    ${NavList} {
      flex-direction: column;
      align-items: flex-start;
    }

    ${NavItem} {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }

    ${Brand} {
      margin-bottom: 1rem;
    }
  }`
};

// React Component
function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  if (!isAuthenticated) {
    return null; // Return nothing if user is not authenticated
  }

  return (
    <HeaderContainer>
      <div className="container">
        <Brand>TASK MANAGER</Brand>
        <NavList>
          <NavItem>
            <NavLink to={"/"}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={"/profile"}>Profile</NavLink>
          </NavItem>
          <NavItem>
            <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
          </NavItem>
          <NavItem>
            <DropdownSelect onChange={(e) => filterTasks(e.target.value)}>
              <DropdownOption value="all">All Tasks</DropdownOption>
              <DropdownOption value="completed">Completed Tasks</DropdownOption>
              <DropdownOption value="incomplete">Incomplete Tasks</DropdownOption>
              <DropdownOption value="archived">Archived Tasks</DropdownOption>
            </DropdownSelect>
          </NavItem>
        </NavList>
      </div>
    </HeaderContainer>
  );
}

export default Header;
