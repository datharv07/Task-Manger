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


const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      });
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
            <h1>{taskTitle}</h1>
          </div>
          <ButtonContainer className="col">
            <Button variant="primary" onClick={handleCreateModalShow}>
              Create Task
            </Button>
          </ButtonContainer>
        </div>
        <div className="row">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
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
   
  }
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    
  }
  .card-text {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;