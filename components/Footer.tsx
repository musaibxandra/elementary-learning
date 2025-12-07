'use client';

import React from "react";
import { Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Example Shadcn-style Footer component
// - Uses Tailwind utility classes
// - Uses shadcn/ui primitives (Button, Input, Card)
// - Responsive, accessible, and easily themable

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand & Social */}
          <div className="space-y-3 sm:space-y-4">
            <Link href="/"
            className='flex cursor-pointer gap-2 items-center'>
              <Image
                src="/icons/logo.jpg"
                alt="Style logo"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain">
              </Image>
            </Link>
            <h3 className="text-xl sm:text-2xl font-semibold">Elementary Learning</h3>
            <p className="text-xs sm:text-sm opacity-80">
              H369 R7307 B373 Abu Ghazal <br/> Tubli, Manama, Bahrain
            </p>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:opacity-80">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Mail" className="hover:opacity-80">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Sitemap / Links */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:col-span-1">
            <div>
              <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Product</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm opacity-90">
                <li>
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Location
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Company</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm opacity-90">
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Stay in the loop</h4>
            <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4">Get product updates, tips, and early access.</p>

            <Card className="p-2 sm:p-3">
              <CardContent className="p-3 sm:p-4">
                <form
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Replace with real subscription logic
                    alert("Subscribed (demo)");
                  }}
                >
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>

                  <div className="flex-1">
                    <div className="relative">
                      <Input
                        id="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        required
                        className="text-sm sm:text-base"
                      />
                      <div className="absolute inset-y-0 right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Mail className="w-4 h-4 opacity-80" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="text-xs sm:text-sm px-4 py-2">Subscribe</Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-xs opacity-70 mt-2 sm:mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-10 border-t border-gray-200 dark:border-gray-800 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm opacity-80 text-center sm:text-left">© {new Date().getFullYear()} YourBrand. All rights reserved.</p>

          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm opacity-90">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Security
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
