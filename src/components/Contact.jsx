import React from 'react';
import resumeData from '../data/resume.json';
import Character3D from './Character3D';
import '../styles/Contact.css';

const Contact = () => {
  const { email, phone, links } = resumeData.profile;

  return (
    <section id="contact" className="contact">
      <div className="contact-glow" data-depth="-0.15" />
      <div className="contact-content">
        <Character3D
          src="/models/buddy.glb"
          alt="Small round robot companion"
          className="character-3d-contact"
          autoRotate
          cameraControls
        />
        <h2 className="contact-heading">Let's build something.</h2>
        <p className="contact-lede">
          Currently open to new opportunities. Question, idea, or just a hello
          — I'll get back to you.
        </p>
        <div className="contact-ctas">
          <a href={`mailto:${email}`} className="btn btn-primary">
            {email}
          </a>
          <a href={`tel:${phone}`} className="btn btn-outline">
            {phone}
          </a>
        </div>
        <div className="contact-social">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/Kartheek_Pamidimukkala_-_Software_Engineer.pdf"
            download
          >
            Résumé ↓
          </a>
        </div>
        <p className="contact-copyright">
          © {new Date().getFullYear()} Kartheek Pamidimukkala
        </p>
      </div>
    </section>
  );
};

export default Contact;
