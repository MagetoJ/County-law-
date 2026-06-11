'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Shield, Users, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-secondary">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <div>
              <h1 className="font-bold text-foreground">KauniSalama</h1>
              <p className="text-xs text-muted-foreground">Law Enforcement Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+254-20-2725000" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              Emergency: +254 20 2725 000
            </a>
            <Link href="/report">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Report Crime</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-20">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Safer Communities Through Technology
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            KauniSalama is Kenya&apos;s comprehensive law enforcement management platform, enabling rapid response, effective case management, and community partnership.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/report">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
                Report a Crime
              </Button>
            </Link>
            <Button variant="outline" className="border-secondary px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-secondary">
              <CardContent className="pt-6">
                <AlertCircle className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Incident Response</h3>
                <p className="text-sm text-muted-foreground">
                  Rapid deployment of resources and coordination between stations for effective incident management.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Community Partnership</h3>
                <p className="text-sm text-muted-foreground">
                  Easy reporting mechanisms and community policing initiatives to build trust and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6">
                <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Data-Driven Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Analytics and crime trend reports to inform strategic planning and resource allocation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Crime Statistics Section */}
      <section className="py-16 border-b border-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">System Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent">47</p>
                <p className="text-sm text-muted-foreground mt-2">Counties Connected</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent">2,500+</p>
                <p className="text-sm text-muted-foreground mt-2">Active Officers</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent">98%</p>
                <p className="text-sm text-muted-foreground mt-2">System Uptime</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <p className="text-4xl font-bold text-accent">45K+</p>
                <p className="text-sm text-muted-foreground mt-2">Cases Processed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Report Section */}
      <section className="py-16 border-b border-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How to Report a Crime</h2>
          <div className="space-y-4">
            {[
              {
                number: 1,
                title: 'Emergency Situations',
                description: 'For immediate threats, always call 999 or your nearest police station directly.',
              },
              {
                number: 2,
                title: 'Use Our Platform',
                description: 'Report crimes online through our secure form. You can report anonymously if you prefer.',
              },
              {
                number: 3,
                title: 'Get Confirmation',
                description: 'Receive a reference number for your report and track its progress.',
              },
              {
                number: 4,
                title: 'Officer Response',
                description: 'Our officers will investigate and follow up on your report through appropriate channels.',
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-accent-foreground font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-b border-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Contact & Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <Phone className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Emergency</h3>
                <p className="text-accent font-bold text-xl">999</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Non-Emergency</h3>
                <p className="text-accent font-bold text-lg">+254 20 2725 000</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Support</h3>
                <p className="text-muted-foreground text-sm">help@kaunisalama.ke</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Help Us Keep Kenya Safe</h2>
          <p className="text-lg text-muted-foreground">
            Your information helps law enforcement protect our communities and bring criminals to justice.
          </p>
          <Link href="/report">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
              Report a Crime Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">KauniSalama</h4>
              <p className="text-sm text-muted-foreground">
                Kenya&apos;s comprehensive law enforcement management platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Report Crime</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Contact</h4>
              <p className="text-sm text-muted-foreground">Emergency: 999</p>
              <p className="text-sm text-muted-foreground">Non-Emergency: +254 20 2725 000</p>
            </div>
          </div>
          <div className="border-t border-secondary pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 KauniSalama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
