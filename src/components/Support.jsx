import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/Support.module.css";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const Support = () => {
  return (
    <>
      <NavbarComponent userRole="guest" />
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Support</h1>
        <p>
          Welcome to our support page. If you have any questions or need
          assistance, please don't hesitate to reach out to us. We're here to
          help you.
        </p>

        <h2>Contact Information</h2>
        <Row>
          <Col>
            <h4>Email Support</h4>
            <p>
              For any inquiries, you can email us at:{" "}
              <a
                href="mailto:support@petadoptplatform.com"
                style={{ color: "#2d767f" }}
              >
                support@petadoptplatform.com
              </a>
            </p>
          </Col>
          <Col>
            <h4>Phone Support</h4>
            <p>
              If you prefer to speak with someone, give us a call at:{" "}
              <strong>1-800-123-4567</strong>
            </p>
          </Col>
        </Row>

        <h2>Frequently Asked Questions (FAQ)</h2>
        <p>Here are some common questions we get from our users:</p>
        <p>
          <ul>
            <li>
              <strong>How do I adopt a pet?</strong> Simply browse available
              pets on our platform, fill out an adoption form, and our partner
              shelters will get in touch with you.
            </li>
            <li>
              <strong>What is the adoption process?</strong> After submitting
              your application, you will be contacted by the shelter to arrange
              a meeting and review your application.
            </li>
            <li>
              <strong>Can I track my adoption status?</strong> Yes, you can log
              into your account to track your application and adoption progress.
            </li>
          </ul>
        </p>

        <h2>Need More Help?</h2>
        <p>
          If you didn't find the answer you're looking for, please feel free to
          contact us directly via email or phone. Our support team is here to
          assist you.
        </p>

        <Button
          variant="primary"
          href="mailto:support@petadoptplatform.com"
          className={`mb-4 ${styles["support-btn"]}`}
        >
          Contact Support
        </Button>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Support;
