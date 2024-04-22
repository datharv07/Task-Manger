import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Remove Card and Stack from react-bootstrap
import toast from "react-hot-toast";
import styled from "styled-components";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";

// Home component
const Home = ({ isAuthenticated, setTasks, taskTitle, setTaskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);
  const [tasks, setAllTasks] = useState([]); // State to hold all tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // State to hold filtered tasks
  const [filter, setFilter] = useState('all'); // 'all', 'complete', 'incomplete', 'archived'

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [filter, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/task/mytask', { withCredentials: true });
      setAllTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const filterTasks = () => {
    let filteredTasks = [];
    switch (filter) {
      case 'complete':
        filteredTasks = tasks.filter(task => task.status === 'completed');
        setTaskTitle("Completed Tasks....");
        break;
      case 'incomplete':
        filteredTasks = tasks.filter(task => task.status === 'incomplete');
        setTaskTitle("Incomplete Tasks....");
        break;
      case 'archived':
        filteredTasks = tasks.filter(task => task.archived === true);
        setTaskTitle("Archived Tasks....");
        break;
      
      default:
        filteredTasks = tasks;
        setTaskTitle("All Tasks.... ");
    }
    setFilteredTasks(filteredTasks);
  };


  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container>
      <div className="container">
      <div className="row">
  <div className="col">
    <h1 style={{ marginBottom: '10px' }}>{taskTitle}</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ButtonContainer>
        <Button variant="primary" onClick={handleCreateModalShow}>
          Create Task
        </Button>
      </ButtonContainer>
      <DropdownSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
        <DropdownOption value="all">All Tasks</DropdownOption>
        <DropdownOption value="complete">Completed Tasks</DropdownOption>
        <DropdownOption value="incomplete">Incomplete Tasks</DropdownOption>
        <DropdownOption value="archived">Archived Tasks</DropdownOption>
      </DropdownSelect>
    </div>
  </div>
</div>

        <div className="row">
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                  <div className="card-title">
                    {task && task.title && task.title.length && task.title.length <= 40
                      ? task.title
                      : (task.title && task.title.slice(0, 40)) + "..."}
                  </div>
                  <div className="card-text">
                    {task && task.description && task.description.length && task.description.length <= 300
                      ? task.description
                      : (task.description && task.description.slice(0, 300)) + "..."}
                  </div>
                  <div className="d-flex justify-content-end">
                    <MdEdit onClick={() => handleUpdateModalShow(task._id)} className="fs-3 mr-2" />
                    <MdDelete onClick={() => deleteTask(task._id)} className="fs-3 mr-2" />
                    <FaEye onClick={() => handleViewModalShow(task._id)} className="fs-3" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>YOU DON'T HAVE ANY {taskTitle}</h1>
          )}
        </div>
      </div>
      <CreateTaskModal handleCreateModalClose={handleCreateModalClose} showCreateModal={showCreateModal} setTasks={setTasks} />
      <UpdateTaskModal handleUpdateModalClose={handleUpdateModalClose} showUpdateModal={showUpdateModal} id={updatedTaskId} setTasks={setTasks} />
      <ViewTaskModal handleViewModalClose={handleViewModalClose} showViewModal={showViewModal} id={viewTaskId} />
    </Container>
  );
};

export default Home;



// Styled components for styling
const Container = styled.div`
  .container {
    margin-top: 50px;
  }
  .row {
    margin-bottom: 20px;
  }
  .card {
    margin-bottom: 20px;
    min-height: 400px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    background: #00000033;
    color: #e2eaea;
    
  }
  .card-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .card-text {
    font-size: 20px ;
    font-family :'Times New Roman', Times, serif
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
