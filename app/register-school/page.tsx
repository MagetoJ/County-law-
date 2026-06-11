'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle2, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { KENYAN_COUNTIES, SCHOOL_TYPES } from '@/lib/constants';

export default function SchoolSelfRegistrationPage() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    type: 'secondary',
    county: '',
    constituency: '',
    ward: '',
    principalName: '',
    principalPhone: '',
    principalEmail: '',
    contactPhone: '',
    contactEmail: '',
    yearEstablished: new Date().getFullYear(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/schools/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStep('success');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h1 className="font-bold text-foreground">KauniSalama</h1>
            <p className="text-xs text-muted-foreground">Educational Portal</p>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'form' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">School Self-Registration</h1>
              <p className="text-muted-foreground mt-2">
                Register your institution directly within KauniSalama. Submissions are flagged as pending until verification.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Institutional Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" /> Institutional Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Official School Name *</label>
                        <Input name="name" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">MoE Registration Number *</label>
                        <Input name="registrationNumber" placeholder="e.g., STR/NBI/..." required value={formData.registrationNumber} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">School Classification Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full h-8 px-2 rounded-lg border border-input bg-background text-sm">
                          {Object.entries(SCHOOL_TYPES).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Year Established</label>
                        <Input type="number" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* Regional Allocation */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" /> Jurisdiction & Geography
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">County *</label>
                        <select name="county" required value={formData.county} onChange={handleChange} className="w-full h-8 px-2 rounded-lg border border-input bg-background text-sm">
                          <option value="">Select County</option>
                          {KENYAN_COUNTIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Constituency *</label>
                        <Input name="constituency" required value={formData.constituency} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Ward *</label>
                        <Input name="ward" required value={formData.ward} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* Leadership Info */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" /> Administration & Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Principal Name *</label>
                        <Input name="principalName" required value={formData.principalName} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Principal Phone *</label>
                        <Input name="principalPhone" required value={formData.principalPhone} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Principal Email *</label>
                        <Input type="email" name="principalEmail" required value={formData.principalEmail} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    Submit Registration Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center space-y-6 py-12">
            <div className="flex justify-center"><CheckCircle2 className="w-16 h-16 text-green-500" /></div>
            <div>
              <h2 className="text-2xl font-bold">Registration Profile Submitted</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Thank you. Your school profile has been securely sent to county compliance auditors. You will receive credential options via email upon data verification.
              </p>
            </div>
            <Button onClick={() => window.location.href = '/public'} variant="outline">
              Return to Public Portal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
