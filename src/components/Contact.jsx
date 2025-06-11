import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_lss0tv3',      // your EmailJS service ID
        'template_imkgtu7',     // your EmailJS template ID
        form.current,
        'YyFXXjYx4OK2Eirma'     // your EmailJS public key
      )
      .then(() => {
        setStatus('✅ Message sent successfully!');
        form.current.reset();
      })
      .catch((error) => {
        console.error(error.text);
        setStatus('❌ Failed to send message. Please try again.');
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-22 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-orange-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          📩 Contact <span className="text-orange-500">Us</span>
        </h2>
        <p className="text-center text-gray-500 mb-8">
          We'd love to hear from you! Fill in the form below and we’ll get back to you soon.
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              name="from_name"
              required
              placeholder="Aditya Bhatt"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Your Email</label>
            <input
              type="email"
              name="reply_to"
              required
              placeholder="aditya@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Your Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-yellow-400 hover:text-black text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
          >
            🚀 Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-center font-semibold text-green-600">{status}</p>
        )}
      </div>
    </section>
  );
};

export default Contact;
