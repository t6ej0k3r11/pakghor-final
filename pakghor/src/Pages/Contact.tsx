import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/Button";
import "./Contact.css";

const Contact: React.FC = () => {
  const contactInfo = [
    {
      title: "Phone",
      body: "+880 123 456 789",
      icon: <PhoneIcon className="contact-icon" />,
    },
    {
      title: "Email",
      body: "pakghor@gmail.com",
      icon: <EnvelopeIcon className="contact-icon" />,
    },
    {
      title: "Location",
      body: "Mymensingh, Bangladesh",
      icon: <MapPinIcon className="contact-icon" />,
    },
  ];

  return (
    <div className="contact-wrapper">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1 className="contact-title">
          <span>Reach Us</span>
        </h1>
        <p className="contact-subtitle">
          We’d love to hear from you! Reach out with any questions, feedback, or
          just to say hello.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="contact-grid">
        {contactInfo.map((info, index) => (
          <div key={index} className="contact-card">
            <div className="contact-icon-wrapper">{info.icon}</div>
            <h3>{info.title}</h3>
            <p>{info.body}</p>
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="contact-form-wrapper">
        <h3 className="form-title">
          <span>Send Us a Message</span>
        </h3>
        <p className="form-subtitle">
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              rows={5}
            ></textarea>
          </div>

          <Button
            text="Send Message"
            type="primary"
            filled={true}
            icon={<PaperAirplaneIcon />}
            to="#"
          />
        </form>
      </section>
    </div>
  );
};

export default Contact;
