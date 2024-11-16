import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className=" bg-gradient-to-br from-red-700 to-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">bookmy-ride</h3>
                        <p className="mb-4">
                            Crafting unforgettable journeys across India
                        </p>
                        <div className="flex space-x-4">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/people/bookmyridein/61567909115992/?mibextid=ZbWKwL"
                                className="hover:text-orange-200 transition-colors"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/bookmy_ride.in/profilecard/?igsh=MTZ2bnRlZGtid2xueg== "
                                className="hover:text-orange-200 transition-colors"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                target="_blank"
                                href="#"
                                className="hover:text-orange-200 transition-colors"
                            >
                                <Twitter size={24} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h4>
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
                                    to="/trips"
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
                                    to="/contact"
                                    className="hover:text-orange-200 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Contact Information
                        </h4>
                        <p className="mb-2">Located in Dehradun, Uttarakhand</p>
                        <p className="mb-2"> India</p>
                        <p className="mb-2">
                            Phone: +91 8077055403 (Sarthak Mittal)
                        </p>
                        <p className="mb-2">
                            Phone: +91 8445599601 (Kartik Mittal)
                        </p>

                        <p>Email: bookmyridein@gmail.com</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-orange-500 text-center">
                    <p>&copy; 2024 bookmy-ride. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
