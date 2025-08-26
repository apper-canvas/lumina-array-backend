import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ onSearch, loading = false, placeholder = "Search across your PDFs..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative flex gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative flex-1">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          icon="Search"
          className="pr-10"
        />
        {query && (
          <motion.button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nord-3 hover:text-nord-4 transition-colors"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={!query.trim() || loading}
        loading={loading}
        className="px-6"
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </motion.form>
  );
};

export default SearchBar;