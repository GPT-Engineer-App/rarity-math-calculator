import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to NFT Rarity Calculator</h1>
      <p className="text-xl mb-8">Calculate the rarity of your NFT attributes with ease.</p>
      <Link to="/nft-calculator">
        <Button size="lg">Go to NFT Calculator</Button>
      </Link>
    </div>
  );
};

export default Index;
