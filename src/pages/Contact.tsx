import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, MapPin, Phone, Send, CheckCircle, Clock } from 'lucide-react';
import Logo from '../components/Logo';

export default function Contact() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(true);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-black/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium text-black hover:text-blue-600 flex items-center gap-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-stretch">
          {/* Contact Info Card */}
          <div className="bg-black rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-black/20 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-6 tracking-tight">Get in Touch</h1>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Have questions about GymLedger? Our team is here to help you professionalize your gym operations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Support Hours</h3>
                    <p className="text-white/60 text-sm">Mon - Sat: 9 AM - 8 PM</p>
                    <p className="text-white/60 text-sm">Response within 2-4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Location</h3>
                    <p className="text-white/60 text-sm">Made with ❤️ in India</p>
                    <p className="text-white/60 text-sm">Serving 500+ Gyms Nationwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Founder & Support</h3>
                    <p className="text-white/60 text-sm">Abeer Choubey</p>
                    <p className="text-white/60 text-sm">+91 94253 23937</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          {/* Action Card - Contact Methods */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-xl flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-black mb-2">Choose your preferred method</h2>
            <p className="text-black/60 mb-4">We're available across multiple channels to assist you.</p>
            
            <div className="grid gap-4">
              <a 
                href="https://wa.me/919425323937"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-blue-50/50 border border-blue-100 rounded-2xl group hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">WhatsApp Support</h3>
                    <p className="text-blue-600 text-sm font-medium">Instant Response</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-blue-600 rotate-180 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="mailto:gymledgertemp@gmail.com"
                className="flex items-center justify-between p-6 bg-black/5 border border-black/5 rounded-2xl group hover:bg-black/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Email Us</h3>
                    <p className="text-black/60 text-sm font-medium">gymledgertemp@gmail.com</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-black/40 rotate-180 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-6 border-t border-black/5">
              <p className="text-black/60 text-sm text-center">
                Prefer a callback? <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">Fill out our form</button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-black/40 text-xs">© 2026 GymLedger. All rights reserved. Built for Indian Gym Owners.</p>
        </div>
      </footer>
    </div>
  );
}
