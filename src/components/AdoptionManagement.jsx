import React, { useState } from "react";
import { Container, Table, Button, ProgressBar } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import "../styles/AdoptionManagement.css"; // Create a CSS file for custom styling

const AdoptionManagement = () => {
  // Sample data for applications
  const [applications, setApplications] = useState([
    {
      id: 1,
      petName: "Buddy",
      status: "In Progress",
      progress: 50,
    },
    {
      id: 2,
      petName: "Max",
      status: "Submitted",
      progress: 100,
    },
    {
      id: 3,
      petName: "Bella",
      status: "Pending",
      progress: 20,
    },
  ]);

  // Function to handle canceling an application
  const handleCancel = (id) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, status: "Cancelled", progress: 0 } : app
      )
    );
  };

  // Function to handle withdrawing an application request
  const handleWithdraw = (id) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, status: "Withdrawn", progress: 0 } : app
      )
    );
  };

  // Function to handle viewing details of an application
  const handleViewDetails = (id) => {
    // You can implement the logic to show detailed information about the application
    alert(`Viewing details for application ID: ${id}`);
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComponent userRole="adopter" />

      {/* Header and Button in a Flexbox Container */}
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Your Adoption Applications</h3>
          <Button variant="success">Submit New Application</Button>
        </div>

        {/* Applications Table */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{app.petName}</td>
                <td>{app.status}</td>
                <td>
                  <ProgressBar
                    now={app.progress}
                    label={`${app.progress}%`}
                    variant={
                      app.progress === 100
                        ? "success"
                        : app.progress > 50
                        ? "info"
                        : "warning"
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(app.id)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={() => handleCancel(app.id)}
                    disabled={app.status === "Cancelled" || app.status === "Withdrawn"}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleWithdraw(app.id)}
                    disabled={app.status === "Cancelled" || app.status === "Withdrawn"}
                  >
                    Withdraw Request
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </>
  );
};

export default AdoptionManagement;
