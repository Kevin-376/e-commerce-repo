import React from 'react'

const Contact = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Faculty</h1>
      <h2>Bright</h2>
      <p>Kevin Junior Naah</p>
      <h2>Maps</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956135056781!3d-6.194741395493371!3m2!1i1024!2j768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x3d2ad6e1e0e9fb1!2sYayasan%20Mutiara%20Almadani!5e0!3m2!1sind!2sid!4v1693528792!5m2!1sind!2sid"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Yayasan Mutiara Almadani Location"
      ></iframe>
      <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
        Warning: Ensure your internet connection is active to load the map.
      </p>
    </div>
  )
}

export default Contact
