// EmployersPage.js
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEmployers,
  registerEmployer,
  updateEmployer,
} from "../redux/actions/authActions";
import moment from "moment";

const EmployersPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    sex: "male",
    designation: "",
  });
  const [productionDate, setProductionDate] = useState(null); // Initialize with today's date

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sex: "male",
      designation: "",
    });
    setShowModal(true);
  };

 // Utility function to convert seconds to HH:MM:SS
const secondsToHHMMSS = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);  // No decimals in seconds
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
};

  const token = useSelector((state) => state?.auth?.user?.tokens.access.token);
  const employersData = useSelector((state) => state?.auth?.employersData);

  useEffect(() => {
    if (productionDate) {
      dispatch(getAllEmployers(token, productionDate));
    } else {
      dispatch(getAllEmployers(token));
    }
  }, [productionDate]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const success = await dispatch(registerEmployer(formData));

    if (success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sex: "male",
        designation: "",
      });

      dispatch(getAllEmployers(token));

      handleClose();
    }
  };

  const changeStatus = async (event, employer) => {
    const success = await dispatch(
      updateEmployer(event.target.checked, employer, token)
    );
    if (success) {
      if (productionDate) {
        dispatch(getAllEmployers(token, productionDate));
      } else {
        dispatch(getAllEmployers(token));
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employers</h2>
        <Button variant="primary" onClick={handleShow}>
          Add New Employer
        </Button>
      </div>
      <div className="mb-4">
        <label>Production Date:</label>
        <input
          type="date"
          value={productionDate?.toISOString().split("T")[0]} // Convert to YYYY-MM-DD format
          onChange={(e) => setProductionDate(new Date(e.target.value))}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date of Joining</th>
            <th>Sex</th>
            <th>Designation</th>
            <th>Production Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employersData?.results
            ?.filter((emp) => emp.role === "user")
            .map((employer) => (
              <tr key={employer.id}>
                <td>{employer.id}</td>
                <td>{employer.firstName}</td>
                <td>{employer.lastName}</td>
                <td>{employer.email}</td>
                <td>{employer.isApproved ? "Approved" : "Pending Approval"}</td>
                <td>{employer.dateofJoining}</td>
                <td>{employer.sex}</td>
                <td>{employer.designation}</td>
                <td>
    {!productionDate
      ? secondsToHHMMSS(employer.timeSpent)
      : employer.dailyProduction.find(
          (prod) =>
            moment(prod.date).format('MMMM Do YYYY') ===
            moment(productionDate, 'MMMM Do YYYY').format('MMMM Do YYYY')
        )
      ? secondsToHHMMSS(
          employer.dailyProduction.find(
            (prod) =>
              moment(prod.date).format('MMMM Do YYYY') ===
              moment(productionDate, 'MMMM Do YYYY').format('MMMM Do YYYY')
          ).amount
        )
      : 'No production found'}
  </td>
                <td>
                  {
                    <input
                      onChange={(e) => changeStatus(e, employer)}
                      checked={employer.isApproved}
                      type="checkbox"
                    ></input>
                  }{" "}
                  {employer.isApproved ? " Disable" : " Approve"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="mb-1">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter first name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="mb-1">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter last name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSex">
              <Form.Label className="mb-1">Sex</Form.Label>
              <Form.Control
                as="select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesignation">
              <Form.Label className="mb-1">designation</Form.Label>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                placeholder="Enter designation"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployersPage;
