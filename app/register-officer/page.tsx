'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle2, User, Landmark, Mail, Lock } from 'lucide-react';
import { POLICE_RANKS } from '@/lib/constants';
import { OtpModal } from '@/components/auth/otp-modal';

export default function OfficerSelfRegistrationPage() {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [formData, setFormData] = useState({
    serviceNumber: '',
    nationalId: '',
    firstName: '',
    lastName: '',
    rank: 'constable',
    station: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenOtpModal = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register/officer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStep('success');
    } catch (error) {
      console.error('Officer onboarding critical pipeline error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h1 className="font-bold text-foreground">KauniSalama</h1>
            <p className="text-xs text-muted-foreground">Law Enforcement Terminal</p>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {step === 'form' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Personnel Self-Onboarding</h1>
              <p className="text-muted-foreground mt-2">
                Register as a field operational responder within KauniSalama. Requires strict email OTP authentication.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="pt-6">
                <form onSubmit={handleOpenOtpModal} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Core Identification Particulars
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Official First Name *</label>
                        <Input name="firstName" required value={formData.firstName} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Official Last Name *</label>
                        <Input name="lastName" required value={formData.lastName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">National Identity Number *</label>
                        <Input name="nationalId" required value={formData.nationalId} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">NPS Service Number *</label>
                        <Input name="serviceNumber" placeholder="e.g., NPK/..." required value={formData.serviceNumber} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-primary" /> Command Allocation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Designated Rank</label>
                        <select name="rank" value={formData.rank} onChange={handleChange} className="w-full h-8 px-2 rounded-lg border border-input bg-background text-sm">
                          {Object.entries(POLICE_RANKS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Primary Attached Station *</label>
                        <Input name="station" required placeholder="e.g. Parklands Police Station" value={formData.station} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" /> Communication Channels
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Secure Operational Email *</label>
                        <Input type="email" name="email" required placeholder="name@police.ke" value={formData.email} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Active Contact Phone *</label>
                        <Input type="tel" name="phone" required placeholder="+254..." value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sidebar-primary-foreground font-semibold flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Request Security Token & Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        )}

        {step === 'otp' && (
          <OtpModal
            email={formData.email}
            onVerified={handleFinalSubmit}
            onCancel={() => setStep('form')}
          />
        )}

        {step === 'success' && (
          <div className="text-center space-y-6 py-12">
            <div className="flex justify-center"><CheckCircle2 className="w-16 h-16 text-green-500" /></div>
            <div>
              <h2 className="text-2xl font-bold">Personnel Records Logged</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Onboarding form successfully cached into security arrays. Upon validation against national command databases, secure link permissions will target your device.
              </p>
            </div>
            <Button onClick={() => window.location.href = '/login'} className="bg-primary text-sidebar-primary-foreground">
              Return to Login Panel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}