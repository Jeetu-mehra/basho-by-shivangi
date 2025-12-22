"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import Link from "next/link";

const TestimonialsPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Interior Designer",
      text: "The craftsmanship is absolutely stunning. Each piece tells its own story and brings a sense of calm to any space.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "James Chen",
      role: "Art Collector",
      text: "I've been collecting pottery for over 20 years, and these pieces are among the finest I've encountered. The attention to detail is remarkable.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emma Rodriguez",
      role: "Home Owner",
      text: "Attending the workshop was transformative. Not only did I learn the craft, but I gained a deeper appreciation for the artistry involved.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Thompson",
      role: "Restaurant Owner",
      text: "These ceramic pieces elevated our dining experience. Our customers constantly ask about them. Truly exceptional work.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
  ];

  const videoTestimonials = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      duration: "2:15",
      title: "Workshop Experience",
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop",
      duration: "3:40",
      title: "Customer Journey",
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop",
      duration: "1:55",
      title: "Studio Tour",
    },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581783342108-c46946103892?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&h=600&fit=crop",
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlay, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlay(false);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlay(false);
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
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
          background: "linear-gradient(135deg, #8B7355 0%, #6B4F3A 100%)",
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
          Stories & Experiences
        </h1>
        <p
          style={{
            fontSize: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            opacity: 0.9,
            lineHeight: "1.6",
          }}
        >
          Discover what our community has to say about their journey with us
        </p>
      </section>

      {/* Testimonials Carousel */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "300",
            textAlign: "center",
            color: "#6B4F3A",
            marginBottom: "60px",
            letterSpacing: "1px",
          }}
        >
          Customer Testimonials
        </h2>

        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "80px 120px",
            boxShadow: "0 20px 60px rgba(107, 79, 58, 0.08)",
            minHeight: "400px",
          }}
        >
          <Quote
            style={{
              position: "absolute",
              top: "40px",
              left: "40px",
              width: "48px",
              height: "48px",
              color: "#E6D5B8",
              opacity: 0.5,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "60px",
            }}
          >
            <img
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #E6D5B8",
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "24px",
                  lineHeight: "1.8",
                  color: "#6B4F3A",
                  marginBottom: "32px",
                  fontStyle: "italic",
                }}
              >
                "{testimonials[activeTestimonial].text}"
              </p>

              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#8B7355",
                    marginBottom: "4px",
                  }}
                >
                  {testimonials[activeTestimonial].name}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#9C9282",
                  }}
                >
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#8B7355",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
              color: "white",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#6B4F3A")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#8B7355")
            }
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#8B7355",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
              color: "white",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#6B4F3A")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#8B7355")
            }
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginTop: "40px",
            }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlay(false);
                  setActiveTestimonial(index);
                }}
                style={{
                  width: activeTestimonial === index ? "32px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor:
                    activeTestimonial === index ? "#8B7355" : "#E6D5B8",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section
        style={{
          padding: "80px 24px",
          backgroundColor: "#E6D5B8",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "300",
              textAlign: "center",
              color: "#6B4F3A",
              marginBottom: "60px",
              letterSpacing: "1px",
            }}
          >
            Video Stories
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  boxShadow: "0 10px 30px rgba(107, 79, 58, 0.15)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(107, 79, 58, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(107, 79, 58, 0.6)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(107, 79, 58, 0.4)")
                  }
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "64px",
                      height: "64px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Play size={28} fill="#8B7355" color="#8B7355" />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    {video.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      opacity: 0.9,
                    }}
                  >
                    {video.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "300",
            textAlign: "center",
            color: "#6B4F3A",
            marginBottom: "60px",
            letterSpacing: "1px",
          }}
        >
          Gallery
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {gallery.map((image, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px",
                aspectRatio: "1",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.querySelector("img").style.transform =
                  "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.querySelector("img").style.transform =
                  "scale(1)";
              }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "100px 24px",
          backgroundColor: "#556B2F",
          textAlign: "center",
          color: "#F5F1E8",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            fontWeight: "300",
            marginBottom: "24px",
            letterSpacing: "1px",
          }}
        >
          Join Our Community
        </h2>
        <p
          style={{
            fontSize: "18px",
            marginBottom: "40px",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Experience the craftsmanship and artistry that our customers cherish
        </p>
        <a
          href="/connect"
          style={{
            backgroundColor: "#F5F1E8",
            color: "#556B2F",
            border: "none",
            padding: "16px 48px",
            fontSize: "18px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.3s",
            letterSpacing: "0.5px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#E6D5B8";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#F5F1E8";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default TestimonialsPage;
