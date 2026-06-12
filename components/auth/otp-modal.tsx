'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface OtpModalProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function OtpModal({ email, onVerified, onCancel }: OtpModalProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(60);

  const triggerOtpRequest = async () => {
    setError('');
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage('A fresh 6-digit code has been dispatched to your email.');
        setCountdown(60);
      } else {
        setError('Failed to dispatch verification code. Please check your network.');
      }
    } catch (err) {
      setError('Communication with the security layer failed.');
    }
  };

  useEffect(() => {
    triggerOtpRequest();
  }, [email]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        onVerified();
      } else {
        const data = await res.json();
        setError(data.detail || 'Invalid verification token entered.');
      }
    } catch (err) {
      setError('Could not verify code due to a network connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-xl bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <MailCheck className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl">Two-Factor Email Verification</CardTitle>
          <CardDescription>
            We have sent a security verification token to <span className="font-semibold text-foreground break-all">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg text-sm text-center">
                {message}
              </div>
            )}

            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit Code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg tracking-widest font-mono h-10"
                disabled={loading}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onCancel} className="w-1/2" disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" className="w-1/2 bg-accent text-accent-foreground font-semibold" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </div>

            <div className="text-center pt-2">
              {countdown > 0 ? (
                <p className="text-xs text-muted-foreground">Resend code available in {countdown}s</p>
              ) : (
                <button
                  type="button"
                  onClick={triggerOtpRequest}
                  className="text-xs text-primary hover:underline flex items-center gap-1 mx-auto font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Resend Verification Code
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}