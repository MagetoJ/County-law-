'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function RegisterSchoolPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refNumber, setRefNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    school_name: '', knec_number: '', school_type: 'Primary', level: 'Day', ownership: 'Public',
    headteacher_name: '', national_id: '', tsc_number: '', phone: '', email: '',
    constituency: '', ward: '', sublocation: '',
    documents: { certificate_url: 'mock_path', tsc_letter_url: 'mock_path' }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/schools/register-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setRefNumber(data.reference_number);
        setStep(4);
      } else {
        alert(data.detail || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-semibold mb-2">
            <span>Progress Tracking</span>
            <span>Step {step} of 3</span>
          </div>
          <CardTitle className="text-xl font-bold text-slate-800">School Self-Registration</CardTitle>
          <CardDescription>Provide details to submit your activation package to the County Education board.</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-500 border-b pb-1">1. Institutional Parameters</h3>
              <div>
                <label className="text-xs font-semibold text-slate-600">School Official Corporate Name</label>
                <Input name="school_name" value={formData.school_name} onChange={handleChange} placeholder="e.g. Murang'a High School" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">KNEC Registration ID</label>
                  <Input name="knec_number" value={formData.knec_number} onChange={handleChange} placeholder="e.g. 10200001" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Ownership Variant</label>
                  <Input name="ownership" value={formData.ownership} onChange={handleChange} placeholder="Public / Private" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-500 border-b pb-1">2. Directorship & Principal Demographics</h3>
              <div>
                <label className="text-xs font-semibold text-slate-600">Headteacher Full Legal Name</label>
                <Input name="headteacher_name" value={formData.headteacher_name} onChange={handleChange} placeholder="Jane Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">TSC Registration Number</label>
                  <Input name="tsc_number" value={formData.tsc_number} onChange={handleChange} placeholder="e.g. 554321" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">National ID Identity Code</label>
                  <Input name="national_id" value={formData.national_id} onChange={handleChange} placeholder="e.g. 12345678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Active Mobile Contact</label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +254712345678" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Administrative Email Address</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="principal@school.co.ke" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-500 border-b pb-1">3. Geographic Geolocation & Certifications</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Constituency</label>
                  <Input name="constituency" value={formData.constituency} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Ward</label>
                  <Input name="ward" value={formData.ward} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Sublocation</label>
                  <Input name="sublocation" value={formData.sublocation} onChange={handleChange} />
                </div>
              </div>
              <div className="p-4 bg-slate-100 border border-dashed rounded text-center text-xs text-slate-500">
                [ Map Component Integration Area — Simulating Map GPS Pin Capture ]
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
              <h3 className="text-lg font-bold text-slate-800">Registration Successfully Dispatched</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your parameters are locked inside the county system database. An SMS containing processing directives has been sent to your device.
              </p>
              <div className="bg-slate-50 p-3 rounded font-mono text-sm inline-block border border-slate-200">
                Reference ID: <span className="font-bold text-indigo-600">{refNumber}</span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={prevStep}>Backward Step</Button>
          )}
          {step < 3 && (
            <Button className="ml-auto bg-slate-900 text-white" onClick={nextStep}>Forward Step</Button>
          )}
          {step === 3 && (
            <Button className="ml-auto bg-indigo-600 text-white" onClick={handleSubmit} disabled={loading}>
              {loading ? "Transmitting..." : "Finalize Application"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
