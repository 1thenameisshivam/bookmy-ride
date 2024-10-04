import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">bookmy-ride</h3>
            <p className="mb-4">Crafting unforgettable journeys across India</p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-orange-200 transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-orange-200 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-orange-200 transition-colors"
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-200 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-200 transition-colors"
                >
                  Our Trips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-200 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-200 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="mb-2">123 Travel Street, Saharanpur</p>
            <p className="mb-2">Uttar Pradesh, India</p>
            <p className="mb-2">Phone: +91 1234567890</p>
            <p>Email: info@bookmy-ride.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-orange-500 text-center">
          <p>&copy; 2023 bookmy-ride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
