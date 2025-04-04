import React, { useContext, useEffect, useState } from "react";
import "./search.css";
import { assets } from "../../../assets/FrontEnd/assets";
import { StoreContext } from "../../context/StoreContext";
import { FoodItem } from "../../FoodItem/FoodItem";
const Search = () => {
  const { url } = useContext(StoreContext);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Track sorting preference

  const handleSearchBox = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    const response = await fetch(url + "/api/food/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ search }),
    });
    const data = await response.json();
    if (data.success) {
      setSearchData(data.data);
    }
  };

  // Fetch data whenever search input changes
  useEffect(() => {
    handleSearch();
  }, [search]);

  // Function to handle sorting
  const handleSort = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    let sortedData = [...searchData];

    if (selectedSort === "low to high") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "high to low") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setSearchData(sortedData);
  };

  return (
    <>
      <div className="search-container">
        <div className="logo">
          <img src={assets.logo} alt="logoImg" className="logo" />
        </div>
        <p className="text">Discover the best food & drinks</p>
        <div className="search-section">
          <div className="search-div">
            <input
              type="text"
              className="search-input"
              value={search}
              placeholder="Search food here...."
              onChange={handleSearchBox}
            />
            <img src={assets.search_icon} alt="" className="search-icon" />
          </div>
          <div className="sorting">
            <select
              name="sort_by"
              id="sort-by"
              className="sortBy"
              value={sortBy}
              onChange={handleSort}
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="low to high">Cost: Low to High</option>
              <option value="high to low">Cost: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="search-result">
        <p className="search-result-text">Search Result: {searchData.length}</p>
        {searchData.length > 0 ? (
          <div className="food-display-list">
            {searchData.map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.foodImage}
              />
            ))}
          </div>
        ) : (
          <div>
            <p className="text">Food not available!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
