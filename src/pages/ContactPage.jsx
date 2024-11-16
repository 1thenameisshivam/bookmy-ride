import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-red-600 mb-2">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600">
                        Get in touch with Book My Ride
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
                                    <MapPin className="w-6 h-6 text-red-500 mr-3" />
                                    <span className="text-gray-700">
                                        Block 65, Near Alankar Jewellers,
                                        Derakhas, Dehradun (UK)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-6 h-6 text-red-500 mr-3" />
                                    <span className="text-gray-700">
                                        8077055403 (Sarthak Mittal)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-6 h-6 text-red-500 mr-3" />
                                    <span className="text-gray-700">
                                        8445599601 (Kartik Mittal)
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-6 h-6 text-red-500 mr-3" />
                                    <span className="text-gray-700">
                                        bookmyridein@gmail.com
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-md border border-red-100">
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">
                                Social Media Platforms
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Facebook className="w-6 h-6 text-red-500 mr-3" />
                                    <a
                                        href="https://facebook.com/bookmy-ride.in"
                                        className="text-red-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        /bookmy-ride.in
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <Instagram className="w-6 h-6 text-red-500 mr-3" />
                                    <a
                                        href="https://instagram.com/bookmy_ride.in"
                                        className="text-red-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @bookmy_ride.in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-8 text-white shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">About Us</h2>
                        <div className="space-y-4">
                            <p>
                                Welcome to Book My Ride, your trusted travel
                                partner. We are dedicated to providing
                                exceptional travel services tailored to your
                                unique needs.
                            </p>
                            <p>
                                Located in Dehradun, Uttarakhand, we aim to make
                                every journey memorable with our reliable
                                services and customer-first approach.
                            </p>
                            <p>
                                Contact us today to plan your next adventure
                                with ease and confidence!
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
                        Book Your Ride Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
