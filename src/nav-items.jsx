import { Home, Calculator } from "lucide-react";
import Index from "./pages/Index.jsx";
import NFTCalculator from "./pages/NFTCalculator.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "NFT Calculator",
    to: "/nft-calculator",
    icon: <Calculator className="h-4 w-4" />,
    page: <NFTCalculator />,
  },
];
