import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          bookmy-ride
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="#featured-trips"
            className="hover:text-orange-200 transition-colors"
          >
            Featured Trips
          </Link>
          <Link
            href="#who-we-are"
            className="hover:text-orange-200 transition-colors"
          >
            Who We Are
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-orange-200 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="hover:text-orange-200 transition-colors"
          >
            Testimonials
          </Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-orange-700 p-4">
          <Link
            href="#featured-trips"
            className="block py-2 hover:text-orange-200 transition-colors"
          >
            Featured Trips
          </Link>
          <Link
            href="#who-we-are"
            className="block py-2 hover:text-orange-200 transition-colors"
          >
            Who We Are
          </Link>
          <Link
            href="#how-it-works"
            className="block py-2 hover:text-orange-200 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="block py-2 hover:text-orange-200 transition-colors"
          >
            Testimonials
          </Link>
        </nav>
      )}
    </header>
  );
}
