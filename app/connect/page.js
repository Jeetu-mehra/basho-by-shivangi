"use client";

import React, { useState } from "react";
import {
  Gift,
  Users,
  Handshake,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Send,
  Check,
} from "lucide-react";

const ConnectPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    service: "",
    teamSize: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      icon: <Gift size={40} />,
      title: "Corporate Gifting",
      description:
        "Elevate your brand with bespoke ceramic gifts that leave a lasting impression. Each piece is carefully crafted to reflect your company's values and aesthetic.",
      features: [
        "Custom branding",
        "Bulk orders",
        "Premium packaging",
        "Personalized designs",
      ],
    },
    {
      icon: <Users size={40} />,
      title: "Team Workshops",
      description:
        "Foster creativity and collaboration through hands-on pottery workshops. Perfect for team building, creative retreats, and professional development.",
      features: [
        "On-site or studio",
        "2-4 hour sessions",
        "All materials included",
        "Expert instruction",
      ],
    },
    {
      icon: <Handshake size={40} />,
      title: "Brand Collaborations",
      description:
        "Partner with us to create unique product lines, limited editions, or co-branded collections that align with your brand identity and vision.",
      features: [
        "Product development",
        "Co-branding opportunities",
        "Marketing support",
        "Exclusive partnerships",
      ],
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        service: "",
        teamSize: "",
        budget: "",
        timeline: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F1E8",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #6B4F3A 0%, #556B2F 100%)",
          padding: "120px 24px 80px",
          textAlign: "center",
          color: "#F5F1E8",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "300",
            marginBottom: "24px",
            letterSpacing: "2px",
          }}
        >
          Let's Create Together
        </h1>
        <p
          style={{
            fontSize: "20px",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
            lineHeight: "1.6",
          }}
        >
          Explore partnerships, corporate solutions, and collaborative
          opportunities that bring artistry to your business
        </p>
      </section>

      {/* Corporate Services */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "300",
              color: "#6B4F3A",
              marginBottom: "16px",
              letterSpacing: "1px",
            }}
          >
            Corporate Services
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#9C9282",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Tailored solutions for businesses seeking unique, handcrafted
            experiences
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "48px 36px",
                boxShadow: "0 10px 40px rgba(107, 79, 58, 0.08)",
                transition: "all 0.3s",
                cursor: "pointer",
                border: "2px solid transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(107, 79, 58, 0.15)";
                e.currentTarget.style.borderColor = "#E6D5B8";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 40px rgba(107, 79, 58, 0.08)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div
                style={{
                  backgroundColor: "#E6D5B8",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6B4F3A",
                  marginBottom: "24px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  fontSize: "26px",
                  fontWeight: "500",
                  color: "#6B4F3A",
                  marginBottom: "16px",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  color: "#9C9282",
                  lineHeight: "1.7",
                  marginBottom: "24px",
                }}
              >
                {service.description}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {service.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    style={{
                      fontSize: "15px",
                      color: "#8B7355",
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#8B7355",
                        borderRadius: "50%",
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Inquiry Form */}
      <section
        style={{
          padding: "100px 24px",
          backgroundColor: "#E6D5B8",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            <h2
              style={{
                fontSize: "42px",
                fontWeight: "300",
                color: "#6B4F3A",
                marginBottom: "16px",
                letterSpacing: "1px",
              }}
            >
              Start a Conversation
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#6B4F3A",
                opacity: 0.8,
              }}
            >
              Tell us about your project and we'll craft a solution together
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "56px",
              boxShadow: "0 20px 60px rgba(107, 79, 58, 0.1)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Contact Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6B4F3A",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                Service Interested In *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "2px solid #E6D5B8",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  backgroundColor: "white",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
              >
                <option value="">Select a service</option>
                <option value="corporate-gifting">Corporate Gifting</option>
                <option value="team-workshops">Team Workshops</option>
                <option value="brand-collaboration">Brand Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Team Size / Quantity
                </label>
                <input
                  type="text"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  placeholder="e.g., 20 people or 100 units"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6B4F3A",
                    marginBottom: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "2px solid #E6D5B8",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.3s",
                    backgroundColor: "white",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
                >
                  <option value="">Select range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-plus">$30,000+</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6B4F3A",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "2px solid #E6D5B8",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  backgroundColor: "white",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
              >
                <option value="">Select timeline</option>
                <option value="urgent">Within 2 weeks</option>
                <option value="1-month">1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6B4F3A",
                  marginBottom: "8px",
                  letterSpacing: "0.5px",
                }}
              >
                Tell Us About Your Project *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Share your vision, requirements, and any specific details..."
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "2px solid #E6D5B8",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.3s",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8B7355")}
                onBlur={(e) => (e.target.style.borderColor = "#E6D5B8")}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitted}
              style={{
                width: "100%",
                backgroundColor: submitted ? "#556B2F" : "#8B7355",
                color: "white",
                border: "none",
                padding: "18px",
                fontSize: "16px",
                fontWeight: "500",
                borderRadius: "12px",
                cursor: submitted ? "default" : "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                letterSpacing: "0.5px",
              }}
              onMouseOver={(e) => {
                if (!submitted)
                  e.currentTarget.style.backgroundColor = "#6B4F3A";
              }}
              onMouseOut={(e) => {
                if (!submitted)
                  e.currentTarget.style.backgroundColor = "#8B7355";
              }}
            >
              {submitted ? (
                <>
                  <Check size={20} />
                  Message Sent Successfully
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Inquiry
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Contact & Social Media */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "300",
              color: "#6B4F3A",
              marginBottom: "16px",
              letterSpacing: "1px",
            }}
          >
            Connect With Us
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#9C9282",
            }}
          >
            Reach out through your preferred channel
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginBottom: "80px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(107, 79, 58, 0.08)",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                backgroundColor: "#E6D5B8",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#6B4F3A",
              }}
            >
              <Mail size={28} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6B4F3A",
                marginBottom: "12px",
              }}
            >
              Email Us
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#8B7355",
              }}
            >
              corporate@basho.com
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(107, 79, 58, 0.08)",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                backgroundColor: "#E6D5B8",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#6B4F3A",
              }}
            >
              <Phone size={28} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6B4F3A",
                marginBottom: "12px",
              }}
            >
              Call Us
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#8B7355",
              }}
            >
              +1 (555) 123-4567
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(107, 79, 58, 0.08)",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                backgroundColor: "#E6D5B8",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#6B4F3A",
              }}
            >
              <MapPin size={28} />
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#6B4F3A",
                marginBottom: "12px",
              }}
            >
              Visit Studio
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#8B7355",
                lineHeight: "1.6",
              }}
            >
              123 Artisan Lane
              <br />
              Portland, OR 97209
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div
          style={{
            backgroundColor: "#556B2F",
            borderRadius: "24px",
            padding: "60px 40px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "32px",
              fontWeight: "300",
              color: "#F5F1E8",
              marginBottom: "16px",
              letterSpacing: "1px",
            }}
          >
            Follow Our Journey
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#E6D5B8",
              marginBottom: "40px",
            }}
          >
            Stay inspired with our latest creations and behind-the-scenes
            moments
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <Instagram size={24} />, name: "@basho.ceramics" },
              { icon: <Facebook size={24} />, name: "Basho Ceramics" },
              { icon: <Linkedin size={24} />, name: "Basho Studio" },
              { icon: <Twitter size={24} />, name: "@bashoceramics" },
            ].map((social, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: "rgba(245, 241, 232, 0.1)",
                  border: "2px solid rgba(245, 241, 232, 0.3)",
                  borderRadius: "16px",
                  padding: "16px 24px",
                  color: "#F5F1E8",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "15px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5F1E8";
                  e.currentTarget.style.color = "#556B2F";
                  e.currentTarget.style.borderColor = "#F5F1E8";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(245, 241, 232, 0.1)";
                  e.currentTarget.style.color = "#F5F1E8";
                  e.currentTarget.style.borderColor =
                    "rgba(245, 241, 232, 0.3)";
                }}
              >
                {social.icon}
                <span>{social.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConnectPage;
