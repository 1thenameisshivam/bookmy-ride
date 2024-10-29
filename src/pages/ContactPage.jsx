/* eslint-disable react/no-unescaped-entities */
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with Gupta Tour and Travel
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-red-50 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-red-700 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">
                    info@guptatourandtravel.com
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-700">
                    Saharanpur, Uttar Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-red-100">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Follow Us
              </h2>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Instagram className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Facebook className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Twitter className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Globe className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <div className="space-y-4">
              <p>
                We are a Uttar Pradesh-based travel agency with a passion for
                crafting memorable journeys across India. Our expertise shines
                through in the successful trips we have designed to breathtaking
                destinations such as Kashmir, Jaipur, and Varanasi.
              </p>
              <p>
                We are proud to be associated with Gupta Tour and Travel, a
                reputable travel agency. Based in Saharanpur, we aim to cover
                all corners of India, offering unique travel experiences
                tailored to our clients' desires.
              </p>
              <p>
                Our mission is to provide customized travel experiences across
                India, keeping the focus on the location and the unique desires
                of our clients.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Ready to Start Your Journey?
          </h2>
          <Link
            to={"/trips"}
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            Plan Your Trip Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
