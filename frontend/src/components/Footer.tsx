import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 inline-block mr-2" />
          <span className="text-xl sm:text-2xl font-bold">EnergyChain</span>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
            <li>
              <a href="#" className="text-sm sm:text-base hover:text-green-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-base hover:text-green-400">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-base hover:text-green-400">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
