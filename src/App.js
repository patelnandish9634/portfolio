import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import profile from "./assets/profile.png";
import project1 from "./assets/project1.png";
import project2 from "./assets/project2.png";
import project3 from "./assets/project3.png";
import emailLogo from "./assets/emailLogo.png";
import linkedinLogo from "./assets/linkedinLogo.png";
import githubLogo from "./assets/githubLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

// Import PDFs
import bcaCertificate from "./assets/Patel Nandish Girishbhai  - Bachelor of Computer Applications.pdf";
import resumePDF from "./assets/Nandish_Resume.pdf";

/* ===== Animation Variants ===== */
const sectionVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function App() {
  const form = useRef();
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen size for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Function to open PDF
  const openPDF = (e, pdfPath) => {
    e.preventDefault();
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
    setIsDegreeOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Function to handle resume download with prompt
  const handleResumeDownload = (e) => {
    e.preventDefault();
    setShowDownloadPrompt(true);
    setIsMobileMenuOpen(false);
  };

  // Function to confirm download
  const confirmDownload = () => {
    setShowDownloadPrompt(false);
    
    const resumeText = `NANDISH PATEL
Full Stack Web Developer

CONTACT
+91 6355847365 | patelnandish9634@gmail.com | Bopal, Ahmedabad - 380058
https://github.com/patelnandish9634

EDUCATION
2024 - 2026: Master of Computer Applications (MCA) - LUNIVERSITY
2021 - 2024: Bachelor of Computer Applications (BCA) - LUNIVERSITY

SKILLS
MERN Stack: MongoDB, Express.js, React.js, Node.js
Frontend: HTML5, CSS, JavaScript, React.js, Bootstrap
Backend: Node.js, Express.js, REST APIs
Database: MongoDB
Tools: Git, GitHub, VS Code, Postman

LANGUAGES
English: Intermediate | Hindi: Fluent | Gujarati: Fluent

OBJECTIVE
Motivated MCA student with hands-on experience in MERN stack development, seeking an entry-level Full-Stack Web Developer role where I can apply my skills in MongoDB, Express.js, React.js, and Node.js to build scalable web applications while continuously learning and contributing to organizational growth.

PROJECTS

E-Learning Platform for Student (MERN Stack)
Designed and developed a full-stack E-Learning web application using MongoDB, Express.js, React.js, and Node.js. Built student, instructor and admin modules for course management, user authentication, and content access. Implemented user authentication and authorization using JWT for secure login and role-based access. Developed RESTful APIs to handle courses, users, enrollments, and progress tracking. Created responsive and user-friendly frontend UI using React.js for seamless learning experience.

Grocery Store E-Commerce Web Application (MERN Stack) - Jun to Aug 2025
Developed a full-stack grocery e-commerce application using MongoDB, Express.js, React.js, and Node.js. Implemented user authentication and authorization for secure access. Applied coupon validation logic (validity, expiry, minimum order value) on backend APIs. Built product listing, category filtering, and search functionality. Developed shopping cart and order placement features. Created admin dashboard to add, update, and delete products. Designed RESTful APIs for products, users, cart, and orders.

ONLINE EXAM GROUP GENERATOR (MERN Stack) - Jan to March 2025
Developed an Online Exam Group Generator system to automatically assign students into exam groups. Implemented logic to randomly and evenly distribute students into multiple exam groups. Designed modules for student data management and group generation. Built a user-friendly interface for generating and viewing exam groups.`;

    if (selectedFormat === 'pdf') {
      const link = document.createElement('a');
      link.href = resumePDF;
      link.download = 'Nandish_Patel_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const blob = new Blob([resumeText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Nandish_Patel_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  // Function to handle form submission
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    emailjs.sendForm(
      'service_9krdq1d',
      'template_snoh8bc',
      form.current,
      'tZudMWHJsKaZ8XykT'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSending(false);
      setShowSuccessMessage(true);
      e.target.reset();
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Email sending failed:', error.text);
      setIsSending(false);
      setShowErrorMessage(true);
      
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    });
  };

  // Certificate data
  const certificates = [
    {
      name: "Interactivity with JavaScript",
      issuer: "University of Michigan",
      grade: "90%",
      year: "2025",
      link: "https://www.coursera.org/account/accomplishments/certificate/2U49EYM7FMVJ"
    },
    {
      name: "Data Visualization and Communication with Tableau",
      issuer: "Duke University",
      grade: "93.66%",
      year: "2025",
      link: "https://www.coursera.org/account/accomplishments/certificate/D2Z9A77RNMNK"
    },
    {
      name: "C for Everyone, Part 2: Structured Programming",
      issuer: "University of California, Santa Cruz",
      grade: "99.50%",
      year: "2024",
      link: "https://www.coursera.org/account/accomplishments/certificate/TQRH9NFP42MN"
    },
    {
      name: "Java Basic Structures: Arrays, Strings, and Files",
      issuer: "Codio",
      grade: "80%",
      year: "2024",
      link: "https://www.coursera.org/account/accomplishments/certificate/EZCMK86Z9V5W"
    },
    {
      name: "Foundations of User Experience (UX) Design",
      issuer: "Google",
      grade: "90%",
      year: "2024",
      link: "https://www.coursera.org/account/accomplishments/certificate/SG3CJDWVBJYV"
    },
    {
      name: "SQL: A Practical Introduction for Querying Databases",
      issuer: "IBM",
      grade: "92%",
      year: "2024",
      link: "https://www.coursera.org/account/accomplishments/certificate/G8W42NCZJ3EG"
    }
  ];

  // Function to handle certificate click
  const handleCertificateClick = (e, link) => {
    e.preventDefault();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Handle navigation click
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsDegreeOpen(false);
  };

  return (
    <div className="main">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="np-logo-premium">
              <span className="np-text-premium">NP</span>
            </div>
            <span className="brand-name">Nandish Patel</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="nav-menu">
            <div className="nav-links">
              <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              <a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
              
              {/* Degree Dropdown - Desktop */}
              <div className="dropdown-container">
                <button 
                  className="nav-link dropdown-btn"
                  onClick={() => setIsDegreeOpen(!isDegreeOpen)}
                  onMouseEnter={() => !isMobile && setIsDegreeOpen(true)}
                  onMouseLeave={() => !isMobile && setIsDegreeOpen(false)}
                >
                  Degree
                  <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {isDegreeOpen && (
                    <motion.div 
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => !isMobile && setIsDegreeOpen(true)}
                      onMouseLeave={() => !isMobile && setIsDegreeOpen(false)}
                    >
                      {/* Bachelor of Computer Application */}
                      <a 
                        href={bcaCertificate} 
                        className="dropdown-item"
                        onClick={(e) => openPDF(e, bcaCertificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="degree-icon">🎓</span>
                        <div className="degree-info">
                          <span className="degree-title">Bachelor of Computer Application</span>
                          <span className="degree-desc">BCA • 2021-2024</span>
                          <span className="degree-status">First Class with Distinction • 8.5 CGPA</span>
                          <span className="degree-pdf-badge">
                            <svg className="pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                              <path d="M12 3v4a2 2 0 002 2h4" strokeWidth="2"/>
                              <path d="M9 13h6M9 17h4" strokeWidth="2"/>
                            </svg>
                            View Certificate
                          </span>
                        </div>
                      </a>
                      
                      <div className="dropdown-divider"></div>
                      
                      {/* Master of Computer Application */}
                      <a href="#mca" className="dropdown-item" onClick={(e) => e.preventDefault()}>
                        <span className="degree-icon">🎓</span>
                        <div className="degree-info">
                          <span className="degree-title">Master of Computer Application</span>
                          <span className="degree-desc">MCA • 2024-2026</span>
                          <span className="degree-status">Pursuing • Current CGPA: 8.8</span>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#certificates" className="nav-link" onClick={(e) => handleNavClick(e, 'certificates')}>Certificates</a>
              <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
            <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#projects" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
          
          {/* Mobile Degree Dropdown */}
          <div className="mobile-nav-link" style={{ padding: 0 }}>
            <button 
              className="dropdown-btn" 
              onClick={() => setIsDegreeOpen(!isDegreeOpen)}
              style={{ width: '100%', padding: '12px', justifyContent: 'space-between' }}
            >
              Degree
              <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor" style={{ transform: isDegreeOpen ? 'rotate(180deg)' : 'none' }}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <AnimatePresence>
              {isDegreeOpen && (
                <motion.div 
                  className="dropdown-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ position: 'static', transform: 'none', marginTop: '8px' }}
                >
                  <a 
                    href={bcaCertificate} 
                    className="dropdown-item"
                    onClick={(e) => openPDF(e, bcaCertificate)}
                  >
                    <span className="degree-icon">🎓</span>
                    <div className="degree-info">
                      <span className="degree-title">Bachelor of Computer Application</span>
                      <span className="degree-desc">BCA • 2021-2024</span>
                      <span className="degree-status">First Class with Distinction • 8.5 CGPA</span>
                      <span className="degree-pdf-badge">
                        <svg className="pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                        </svg>
                        View Certificate
                      </span>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#mca" className="dropdown-item" onClick={(e) => e.preventDefault()}>
                    <span className="degree-icon">🎓</span>
                    <div className="degree-info">
                      <span className="degree-title">Master of Computer Application</span>
                      <span className="degree-desc">MCA • 2024-2026</span>
                      <span className="degree-status">Pursuing • Current CGPA: 8.8</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <a href="#certificates" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'certificates')}>Certificates</a>
          <a href="#contact" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          <a href="#" className="mobile-nav-link" onClick={handleResumeDownload}>Download Resume</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <motion.div
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <motion.span className="hero-greeting" variants={itemVariant}>
            👋 Hey, I'm
          </motion.span>
          
          <motion.h1 variants={itemVariant}>
            Nandish Patel
          </motion.h1>

          <motion.div className="hero-title" variants={itemVariant}>
            <span className="gradient-text">Full Stack MERN Developer</span>
          </motion.div>

          <motion.p variants={itemVariant}>
            I build scalable, production-ready web applications with modern UI,
            secure authentication systems, and real-world business logic.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariant}>
            <a href="#projects" className="btn-primary" onClick={(e) => handleNavClick(e, 'projects')}>View Projects</a>
            <a href="#" className="btn-secondary" onClick={handleResumeDownload}>Download Resume</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <div className="image-wrapper">
            <div className="image-glow"></div>
            <img src={profile} alt="Nandish Patel" loading="lazy" />
          </div>
        </motion.div>
      </section>

      {/* DOWNLOAD PROMPT MODAL */}
      <AnimatePresence>
        {showDownloadPrompt && (
          <motion.div 
            className="download-prompt-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDownloadPrompt(false)}
          >
            <motion.div 
              className="download-prompt-card"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="prompt-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
              </div>

              <div className="prompt-icon-wrapper">
                <svg className="prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 16V4M12 16L8 12M12 16L16 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeWidth="2"/>
                </svg>
              </div>

              <h3 className="prompt-title">Download Resume</h3>
              
              <p className="prompt-description">
                Choose your preferred format to download Nandish's resume
              </p>

              <div className="format-options">
                <label className={`format-option ${selectedFormat === 'pdf' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="format" 
                    value="pdf" 
                    checked={selectedFormat === 'pdf'}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  />
                  <div className="format-content">
                    <svg className="format-icon pdf-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                    </svg>
                    <span className="format-name">PDF Format</span>
                    <span className="format-size">~245 KB</span>
                  </div>
                  <div className="format-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>

                <label className={`format-option ${selectedFormat === 'txt' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="format" 
                    value="txt" 
                    checked={selectedFormat === 'txt'}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  />
                  <div className="format-content">
                    <svg className="format-icon txt-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 7h16M4 12h16M4 17h10" strokeWidth="2" strokeLinecap="round"/>
                      <rect x="2" y="3" width="20" height="18" rx="2" strokeWidth="2"/>
                    </svg>
                    <span className="format-name">Text Format</span>
                    <span className="format-size">~8 KB</span>
                  </div>
                  <div className="format-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>
              </div>

              <div className="prompt-actions">
                <motion.button 
                  className="prompt-btn cancel-btn"
                  onClick={() => setShowDownloadPrompt(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  className="prompt-btn download-btn"
                  onClick={confirmDownload}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="download-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 16V4M12 16L8 12M12 16L16 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeWidth="2"/>
                  </svg>
                  Download Now
                </motion.button>
              </div>

              <button className="prompt-close" onClick={() => setShowDownloadPrompt(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariant}>About Me</motion.h2>
        <motion.div className="about-content" variants={itemVariant}>
          <motion.p className="about-text" variants={itemVariant}>
            I'm a Full Stack MERN Developer who enjoys building production-ready web applications from scratch.
          </motion.p>
          
          <motion.p className="about-text" variants={itemVariant}>
            I specialize in developing scalable backend systems, secure authentication flows, and clean, 
            modern frontend interfaces. I've built full-featured platforms including e-commerce systems 
            with coupons, order management, and admin control panels.
          </motion.p>
          
          <motion.p className="about-text" variants={itemVariant}>
            My goal is to create efficient, user-focused applications that deliver real business value.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* TECH STACK */}
      <motion.section
        className="section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariant}>Tech Stack</motion.h2>

        <motion.div className="tech-stack-categorized" variants={sectionVariant}>
          
          {/* Frontend */}
          <motion.div className="tech-category" variants={itemVariant}>
            <h3 className="category-title">
              <span className="category-icon">🎨</span>
              Frontend
            </h3>
            <div className="category-items">
              {["React.js", "JavaScript (ES6)", "HTML5", "CSS3"].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tech-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div className="tech-category" variants={itemVariant}>
            <h3 className="category-title">
              <span className="category-icon">⚙️</span>
              Backend
            </h3>
            <div className="category-items">
              {["Node.js", "Express.js", "REST APIs"].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tech-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Database */}
          <motion.div className="tech-category" variants={itemVariant}>
            <h3 className="category-title">
              <span className="category-icon">🗄️</span>
              Database
            </h3>
            <div className="category-items">
              {["MongoDB", "Firebase"].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tech-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Auth & Security */}
          <motion.div className="tech-category" variants={itemVariant}>
            <h3 className="category-title">
              <span className="category-icon">🔐</span>
              Auth & Security
            </h3>
            <div className="category-items">
              {["JWT", "Role-Based Access"].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tech-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div className="tech-category" variants={itemVariant}>
            <h3 className="category-title">
              <span className="category-icon">🛠️</span>
              Tools
            </h3>
            <div className="category-items">
              {["Git", "GitHub", "Postman", "VS Code"].map((skill, index) => (
                <motion.span
                  key={index}
                  className="tech-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariant}>Featured Projects</motion.h2>

        <div className="project-grid">
          {[
            {
              title: "Grocery Store E-commerce Platform",
              desc: "Developed a full-stack e-commerce web application with user authentication, product management, cart functionality, coupon system, and order workflow. Includes a secure admin dashboard for managing products, categories, users, and orders.",
              tags: ["React", "Node.js", "MongoDB", "Express"],
              image: project1,
              link: "https://github.com/patelnandish9634/Grocery-Store"
            },
            {
              title: "Online Exam Group Generator",
              desc: "Built a MERN-based application that dynamically assigns students into exam groups using backend logic and database handling. Integrated Excel export functionality to download structured group data.",
              tags: ["React", "Node.js", "MongoDB", "Express"],
              image: project2,
              link: "#"
            },
            {
              title: "Student E-Learning Platform",
              desc: "Built a full-stack academic platform featuring role-based access control with faculty subject creation, admin verification and approval workflow, and controlled student access to approved subjects. Implemented structured database design and scalable REST APIs using the MERN stack.",
              tags: ["React", "Node.js", "MongoDB", "Express"],
              image: project3,
              link: "#"
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={itemVariant}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="project-image-wrapper">
                <div className="project-image-glow"></div>
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="card-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="card-link" target="_blank" rel="noopener noreferrer">View Project →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CERTIFICATES */}
      <motion.section
        id="certificates"
        className="section"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariant}>Certifications</motion.h2>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="certificate-card"
              variants={itemVariant}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="certificate-header">
                <span className="certificate-icon">📜</span>
                <span className="certificate-grade">{cert.grade}</span>
              </div>
              <h3>{cert.name}</h3>
              <p className="issuer">{cert.issuer}</p>
              <div className="certificate-footer">
                <span className="certificate-year">{cert.year}</span>
                <a 
                  href={cert.link}
                  onClick={(e) => handleCertificateClick(e, cert.link)}
                  className="card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="section contact"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariant}>Let's Work Together</motion.h2>
        
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div 
              className="form-message success-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <svg className="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Message sent successfully! I'll get back to you soon.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showErrorMessage && (
            <motion.div 
              className="form-message error-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <svg className="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Failed to send message. Please try again or email directly.</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="contact-wrapper">
          {/* Contact Info */}
          <motion.div className="contact-info" variants={sectionVariant}>
            <motion.h3 variants={itemVariant}>Get in touch</motion.h3>
            <motion.p variants={itemVariant} className="contact-description">
              Have a project in mind? Looking for a developer? Let's discuss how we can work together to bring your ideas to life.
            </motion.p>
            
            <motion.div className="contact-details" variants={sectionVariant}>
              <motion.a 
                href="mailto:patelnandish9634@gmail.com" 
                className="contact-item"
                variants={itemVariant}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon-wrapper">
                  <img src={emailLogo} alt="Email" className="contact-logo-image" loading="lazy" />
                </div>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">patelnandish9634@gmail.com</span>
                </div>
              </motion.a>
              
              <motion.a 
                href="https://www.linkedin.com/in/nandish-patel-384481369/" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                variants={itemVariant}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon-wrapper">
                  <img src={linkedinLogo} alt="LinkedIn" className="contact-logo-image" loading="lazy" />
                </div>
                <div className="contact-text">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">linkedin.com/in/nandish-patel</span>
                </div>
              </motion.a>
              
              <motion.a 
                href="https://github.com/patelnandish9634" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                variants={itemVariant}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon-wrapper">
                  <img src={githubLogo} alt="GitHub" className="contact-logo-image" loading="lazy" />
                </div>
                <div className="contact-text">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/patelnandish9634</span>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.form 
            ref={form}
            className="contact-form"
            variants={sectionVariant}
            onSubmit={sendEmail}
          >
            <motion.div className="form-group" variants={itemVariant}>
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="from_name" 
                placeholder="John Doe"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={itemVariant}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="from_email" 
                placeholder="john@example.com"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={itemVariant}>
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Project Inquiry"
              />
            </motion.div>

            <motion.div className="form-group" variants={itemVariant}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </motion.div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              variants={itemVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="sending-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          {/* Social Media Icons */}
          <div className="footer-social">
            {/* GitHub */}
            <a 
              href="https://github.com/patelnandish9634" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon github"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="tooltip">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/nandish-patel-384481369/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon linkedin"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="tooltip">LinkedIn</span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/nandish.patel.982/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              <span className="tooltip">Instagram</span>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/nandish.patel.982/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon facebook"
            >
              <svg viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
              </svg>
              <span className="tooltip">Facebook</span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/916355847365" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon whatsapp"
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.473-.149-.673.149-.2.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.673-1.62-.922-2.22-.242-.579-.487-.5-.673-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.118 1.526 5.854L.042 24l6.305-1.52C8.063 23.442 9.98 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.856 0-3.64-.52-5.157-1.423l-.37-.222-3.737.904.998-3.648-.23-.38A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              <span className="tooltip">WhatsApp</span>
            </a>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
            <a href="#certificates" onClick={(e) => handleNavClick(e, 'certificates')}>Certificates</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>© 2026 Nandish Patel — Full Stack MERN Developer</p>
            <p style={{ fontSize: '0.8rem', marginTop: '8px', color: '#475569' }}>
              Built with React, Framer Motion & ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;