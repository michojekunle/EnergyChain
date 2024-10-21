"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBarr() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="w-full fixed top-0 z-10  bg-white">
      <header className=" container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/de-grid-logo.png" alt="logo" className="w-[150px] h-[70px]" width={200} height={200}/>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#"
                  className="text-sm lg:text-base text-green-800 hover:text-green-600">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="text-sm lg:text-base text-green-800 hover:text-green-600">
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm lg:text-base text-green-800 hover:text-green-600">
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-green-800" />
            ) : (
              <Menu className="h-6 w-6 text-green-800" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-green-800 hover:text-green-600 block py-2"
                  onClick={toggleMobileMenu}>
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-green-800 hover:text-green-600 block py-2"
                  onClick={toggleMobileMenu}>
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#get-started"
                  className="text-green-800 hover:text-green-600 block py-2"
                  onClick={toggleMobileMenu}>
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
