
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { categories, getAllTags } from '@/data/products';

interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
}

export function ProductFilters({
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice
}: ProductFiltersProps) {
  const tags = getAllTags();
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };
  
  const handleTagChange = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3">Price Range</h3>
        <Slider 
          min={minPrice} 
          max={maxPrice} 
          step={1} 
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="my-6"
        />
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3">Tags</h3>
        <div className="space-y-2">
          {tags.map(tag => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox 
                id={`tag-${tag}`}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagChange(tag)}
              />
              <label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
