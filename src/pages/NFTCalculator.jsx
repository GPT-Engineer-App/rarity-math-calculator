import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NFTCalculator = () => {
  const [curveType, setCurveType] = useState('linear');
  const [attributes, setAttributes] = useState([{ name: '', subcategories: [''], weight: 1 }]);
  const [totalNFTs, setTotalNFTs] = useState(1000);
  const [rarityResults, setRarityResults] = useState(null);
  const [graphData, setGraphData] = useState(null);

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
    const results = attributes.map(attribute => {
      const subcategoryCount = attribute.subcategories.length;
      const base = 0.5;
      
      // Calculate rarity scores using exponential distribution
      const rarityScores = attribute.subcategories.map((_, index) => {
        return Math.pow(base, index / (subcategoryCount - 1));
      });
      
      // Apply weights to rarity scores
      const weightedRarityScores = rarityScores.map(score => score * attribute.weight);
      
      // Calculate total weighted rarity for normalization
      const totalWeightedRarity = weightedRarityScores.reduce((sum, score) => sum + score, 0);
      
      // Calculate counts and normalize
      const counts = weightedRarityScores.map(score => (score / totalWeightedRarity) * totalNFTs);
      
      return {
        name: attribute.name,
        subcategories: attribute.subcategories.map((subcat, index) => ({
          name: subcat,
          rarityScore: rarityScores[index],
          weightedRarityScore: weightedRarityScores[index],
          count: Math.round(counts[index]),
        })),
        weightedSubcategoryCount: subcategoryCount * attribute.weight,
      };
    });

    setRarityResults(results);

    // Prepare data for the graph
    const graphData = results.flatMap(attribute => 
      attribute.subcategories.map(subcat => ({
        attribute: attribute.name,
        subcategory: subcat.name,
        count: subcat.count,
      }))
    );

    setGraphData(graphData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFT Rarity Calculator</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Distribution Curve</CardTitle>
          <CardDescription>The rarity calculation uses an exponential distribution curve.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Exponential distribution is used for rarity calculation.</p>
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

      <Button onClick={calculateRarity} className="w-full mb-4">Calculate Rarity</Button>
      {rarityResults && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Rarity Results</CardTitle>
          </CardHeader>
          <CardContent>
            {rarityResults.map((result, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{result.name}</h3>
                <p>Weighted Subcategory Count: {result.weightedSubcategoryCount}</p>
                <ul>
                  {result.subcategories.map((subcat, subIndex) => (
                    <li key={subIndex}>
                      {subcat.name}: Rarity Score = {subcat.rarityScore.toFixed(4)}, 
                      Weighted Rarity Score = {subcat.weightedRarityScore.toFixed(4)},
                      Estimated Count = {subcat.count}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {graphData && (
        <Card>
          <CardHeader>
            <CardTitle>Attribute Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={graphData}>
                <XAxis dataKey="subcategory" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NFTCalculator;
