import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const Terms = () => {
  return (
    <>
      <NavbarComponent/>
      <Container className="mt-4">
        <h1 className="mb-4 text-center">Terms and Conditions</h1>
        <p>
          <strong>Effective Date:</strong> December 11, 2024
        </p>
        <p>
          Welcome to the Pet Adoption Platform (“Platform”). These Terms and
          Conditions govern your use of our website, services, and content. By
          accessing or using the Platform, you agree to comply with and be bound
          by these Terms and Conditions.
        </p>

        <h2>1. About Us</h2>
        <p>
          The Pet Adoption Platform is a collaborative initiative with the{" "}
          <strong>Ontario SPCA and Humane Society</strong>, a registered charity
          committed to animal welfare for over 150 years. Our mission is to
          increase adoption rates, reduce shelter stay durations, and expand
          partnerships to benefit animals across Ontario.
        </p>

        <h2>2. Use of the Platform</h2>
        <p>
          You agree to use the Platform for lawful purposes and in a manner
          consistent with these Terms and applicable laws. Specifically:
        </p>
        <p>
          <ul>
            <li>
              You must be at least 18 years old or have parental/guardian
              consent to use the Platform.
            </li>
            <li>
              You agree not to misuse the Platform by uploading harmful or
              inappropriate content, engaging in fraud, or interfering with the
              functionality of the website.
            </li>
          </ul>
        </p>

        <h2>3. Animal Adoption Process</h2>
        <p>
          The Platform provides tools to streamline the adoption process by
          offering:
        </p>
        <p>
          <ul>
            <li>Detailed animal profiles.</li>
            <li>Compatibility matching services.</li>
          </ul>
          <p>Please note:</p>
          <ul>
            <li>
              Final adoption decisions are made by the respective shelters or
              the Ontario SPCA and Humane Society.
            </li>
            <li>
              The Platform serves as a facilitator and does not guarantee
              successful adoptions.
            </li>
          </ul>
        </p>

        <h2>4. Privacy</h2>
        <p>
          Your use of the Platform is subject to our{" "}
          <Link to="/privacy" style={{ color: "#2d767f" }}>
            Privacy Policy
          </Link>
          {". "}
          By using the Platform, you consent to the collection, use, and sharing
          of your information as outlined in the Privacy Policy.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Platform, including text, images, logos, and
          software, is the property of the Platform or its partners and is
          protected under copyright laws. You may not reproduce, distribute, or
          use the content without prior written consent.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          The Platform is provided on an "as-is" basis. We do not guarantee the
          accuracy or completeness of information provided by shelters or users.
          To the fullest extent permitted by law, we disclaim liability for:
        </p>
        <p>
          <ul>
            <li>Errors or omissions in the content.</li>
            <li>Any loss or damage arising from the use of the Platform.</li>
          </ul>
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          The Platform may include links to third-party websites. We are not
          responsible for the content, policies, or practices of these external
          sites.
        </p>

        <h2>8. Amendments</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time.
          Changes will be effective upon posting. Continued use of the Platform
          after updates constitutes your acceptance of the revised Terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of the Province of
          Ontario and the laws of Canada applicable therein. Any disputes will
          be resolved in the courts of Ontario.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have questions or concerns about these Terms and Conditions,
          please contact us at:
        </p>
        <p>
          <strong>Ontario SPCA and Humane Society</strong>
          <br />
          1-833-9ANIMAL (1-833-926-4625)
        </p>
        <p>For emergencies, call 911.</p>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Terms;
