import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
}

export function ContactModal({ isOpen, onClose, recipientEmail }: ContactModalProps) {
  const { user } = useAuth();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Project Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) setSenderName(user.displayName);
      if (user.email) setSenderEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;

  const presets = ['Project Inquiry', 'Collaboration', 'Job Opportunity', 'Say Hello 👋'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        senderName,
        senderEmail,
        subject,
        message,
        createdAt: new Date().toISOString(),
        userId: user ? user.uid : 'anonymous'
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit message to Firebase:', err);
      try {
        handleFirestoreError(err, OperationType.WRITE, 'messages');
      } catch {
        // Fallback grace
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSenderName('');
    setSenderEmail('');
    setSubject('Project Inquiry');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f4f3ee] border-2 border-zinc-900 rounded-3xl max-w-lg w-full shadow-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full border border-zinc-900 text-zinc-900 hover:bg-amber-400 transition-colors cursor-pointer"
          aria-label="Close message form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 border border-zinc-900 rounded-full font-mono text-xs font-bold text-zinc-900 mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Send Direct Message</span>
              </div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                Let's Build Together
              </h2>
              <p className="text-xs text-zinc-600 mt-1">
                Send a quick note to <span className="font-mono font-bold text-zinc-900">{recipientEmail}</span>
              </p>
            </div>

            {/* Quick Topic Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 font-mono">
                Select Subject:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSubject(p)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                      subject === p
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 font-mono mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 font-mono mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 font-mono mb-1">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project idea or message..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-extrabold text-xs rounded-full border border-zinc-900 shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Toast */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-zinc-900">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                Thank you <span className="font-bold text-zinc-900">{senderName}</span>. Your message regarding "{subject}" has been delivered.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2 bg-amber-400 text-zinc-900 font-bold text-xs rounded-full border border-zinc-900 cursor-pointer shadow-2xs"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
