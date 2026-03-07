import React from 'react';
import { motion } from 'framer-motion';
import { Video, Film, Camera } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Music Videos',
    desc: 'High-end visuals, dynamic edits, and creative direction tailored to artists.',
    icon: <Video size={48} />
  },
  {
    id: 2,
    title: 'Brand Content',
    desc: 'Cinematic commercials and social media content to elevate your brand identity.',
    icon: <Film size={48} />
  },
  {
    id: 3,
    title: 'Event Coverage',
    desc: 'Capturing unforgettable moments with a premium, documentary-style approach.',
    icon: <Camera size={48} />
  }
];

const Services = () => {
  return (
    <section id="services" className="section-padding" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>What We <span style={{ color: 'var(--color-primary)' }}>Do</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We specialize in creating visually stunning content across multiple disciplines.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10, borderColor: 'var(--color-primary)' }}
              style={{
                background: '#121212',
                padding: '3rem 2rem',
                borderRadius: '8px',
                border: '1px solid #222',
                textAlign: 'center',
                transition: 'border-color 0.3s ease',
                cursor: 'default'
              }}
            >
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
