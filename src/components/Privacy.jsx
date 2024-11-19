import React from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const Privacy = () => {
  return (
    <>
      <NavbarComponent userRole="guest" />
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> December 11, 2024
        </p>
        <p>
          The Pet Adoption Platform (“Platform”) values your privacy. This
          Privacy Policy outlines how we collect, use, store, and share your
          personal information. By using the Platform, you agree to the terms of
          this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other contact details provided during account
              registration or adoption inquiries.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Browser type, device
              information, and browsing behavior collected through cookies or
              analytics tools.
            </li>
          </ul>
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <p>
          <ul>
            <li>
              Facilitate the adoption process by connecting you with shelters
              and animal profiles.
            </li>
            <li>
              Communicate with you about your inquiries, account updates, or
              adoption requests.
            </li>
            <li>
              Improve the Platform by analyzing user behavior and preferences.
            </li>
          </ul>
        </p>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <p>
          <ul>
            <li>
              <strong>Shelters and Partners:</strong> To process adoption
              inquiries or provide requested services.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party providers who
              assist in hosting, analytics, or communication services.
            </li>
            <li>
              <strong>Legal Authorities:</strong> If required by law or to
              protect the rights and safety of the Platform and its users.
            </li>
          </ul>
        </p>

        <h2>4. Data Security</h2>
        <p>
          We take reasonable precautions to protect your data from unauthorized
          access, loss, or misuse. However, no system is completely secure, and
          we cannot guarantee the security of your information.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <p>
          <ul>
            <li>
              Access and review the personal information we hold about you.
            </li>
            <li>
              Request corrections to inaccurate or incomplete information.
            </li>
            <li>
              Request deletion of your personal data, subject to legal and
              contractual obligations.
            </li>
          </ul>
        </p>

        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          The Platform uses cookies and similar technologies to enhance user
          experience and analyze website traffic. You can manage cookie
          preferences through your browser settings.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          The Platform may include links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          effective upon posting. Your continued use of the Platform constitutes
          acceptance of the updated policy.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          <strong>Ontario SPCA and Humane Society</strong>
          <br />
          Email:{" "}
          <a href="mailto:support@ontariospca.ca" style={{ color: "#2d767f" }}>
            support@ontariospca.ca
          </a>
          <br />
          Phone: 1-833-9ANIMAL (1-833-926-4625)
        </p>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Privacy;
