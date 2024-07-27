import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const NFTCalculator = () => {
  const [curveType, setCurveType] = useState('linear');
  const [attributes, setAttributes] = useState([{ name: '', subcategories: [''], weight: 1 }]);
  const [totalNFTs, setTotalNFTs] = useState(1000);

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', subcategories: [''], weight: 1 }]);
  };

  const updateAttribute = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addSubcategory = (attrIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].subcategories.push('');
    setAttributes(newAttributes);
  };

  const updateSubcategory = (attrIndex, subIndex, value) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].subcategories[subIndex] = value;
    setAttributes(newAttributes);
  };

  const calculateRarity = () => {
    // Implement rarity calculation based on the selected curve type
    // This is a placeholder and should be replaced with actual calculations
    console.log("Calculating rarity...");
    console.log("Curve type:", curveType);
    console.log("Attributes:", attributes);
    console.log("Total NFTs:", totalNFTs);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Rarity Calculator</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Distribution Curve</CardTitle>
          <CardDescription>Select the distribution curve type for rarity calculation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={curveType} onValueChange={setCurveType}>
            <SelectTrigger>
              <SelectValue placeholder="Select curve type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="exponential">Exponential</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Total NFTs</CardTitle>
          <CardDescription>Enter the total number of NFTs in the collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            type="number" 
            value={totalNFTs} 
            onChange={(e) => setTotalNFTs(parseInt(e.target.value))} 
            min="1"
          />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Attributes</CardTitle>
          <CardDescription>Define attributes and their subcategories.</CardDescription>
        </CardHeader>
        <CardContent>
          {attributes.map((attr, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Label>Attribute Name</Label>
              <Input 
                value={attr.name} 
                onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                className="mb-2"
              />
              <Label>Weight</Label>
              <Input 
                type="number" 
                value={attr.weight} 
                onChange={(e) => updateAttribute(index, 'weight', parseFloat(e.target.value))}
                min="0"
                step="0.1"
                className="mb-2"
              />
              <Label>Subcategories</Label>
              {attr.subcategories.map((sub, subIndex) => (
                <Input 
                  key={subIndex}
                  value={sub}
                  onChange={(e) => updateSubcategory(index, subIndex, e.target.value)}
                  className="mb-2"
                />
              ))}
              <Button onClick={() => addSubcategory(index)} className="mt-2">Add Subcategory</Button>
            </div>
          ))}
          <Button onClick={addAttribute}>Add Attribute</Button>
        </CardContent>
      </Card>

      <Button onClick={calculateRarity} className="w-full">Calculate Rarity</Button>
    </div>
  );
};

export default NFTCalculator;
