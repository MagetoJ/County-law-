'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Phone, MapPin } from 'lucide-react';

export default function CrimeReportPage() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
    date: '',
    time: '',
    yourName: '',
    email: '',
    phone: '',
    witnesses: '',
    anonymous: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to the backend
    console.log('Crime report submitted:', formData);
    setStep('success');
  };

  const incidentTypes = [
    'Theft',
    'Robbery',
    'Assault',
    'Fraud',
    'Drug Offense',
    'Traffic Violation',
    'Vandalism',
    'Sexual Offense',
    'Cybercrime',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-secondary">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">KauniSalama</h2>
              <p className="text-xs text-muted-foreground">Law Enforcement Portal</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+254-20-2725000" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                Emergency: +254 20 2725 000
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'form' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Report a Crime</h1>
              <p className="text-muted-foreground">
                Help us maintain public safety by reporting criminal incidents. Your information will be treated with confidentiality.
              </p>
            </div>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Incident Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type of Incident *</label>
                    <select
                      name="incidentType"
                      value={formData.incidentType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select incident type...</option>
                      {incidentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        name="location"
                        placeholder="Where did the incident occur?"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Time *</label>
                      <Input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                    <textarea
                      name="description"
                      placeholder="Please provide detailed information about the incident..."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  {/* Witnesses */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Witnesses</label>
                    <Input
                      type="text"
                      name="witnesses"
                      placeholder="Names of any witnesses (optional)"
                      value={formData.witnesses}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Your Information */}
                  <div className="border-t border-secondary pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Your Information</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <Input
                          type="text"
                          name="yourName"
                          placeholder="Your full name"
                          value={formData.yourName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="+254 712 345 678"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded border border-secondary"
                        />
                        <span className="text-sm text-foreground">Report anonymously</span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-foreground">
                        Your information will be treated confidentially and used only for law enforcement purposes. You can report anonymously if you prefer.
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 rounded-lg"
                  >
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted Successfully</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for reporting this incident. Your information has been received and will be reviewed by law enforcement officers. A reference number has been assigned to your report.
              </p>
            </div>
            <div className="bg-secondary/20 border border-secondary rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
              <p className="text-2xl font-mono font-bold text-accent">KS-2024-{Math.floor(Math.random() * 100000)}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setStep('form')} className="border-secondary">
                Submit Another Report
              </Button>
              <Button onClick={() => window.location.href = '/'} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-secondary mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Emergency</h4>
              <p className="text-muted-foreground text-sm">For life-threatening emergencies, call</p>
              <p className="font-bold text-accent">999</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Non-Emergency</h4>
              <p className="text-muted-foreground text-sm">For non-emergency reports, call</p>
              <p className="font-bold text-accent">+254 20 2725 000</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <p className="text-muted-foreground text-sm">help@kaunisalama.ke</p>
              <p className="text-muted-foreground text-sm">www.kaunisalama.ke</p>
            </div>
          </div>
          <div className="border-t border-secondary pt-6 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 KauniSalama. All rights reserved. | <a href="#" className="hover:text-foreground">Privacy Policy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
