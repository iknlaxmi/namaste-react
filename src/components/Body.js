import { useEffect, useState } from 'react';
import resList from '../../utils/mockData';
import RestoCard, { withPromotedLabel } from './RestoCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../../utils/useOnlineStatus';
//Body component
const Body = () => {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);
  const [filteredRestaurents, setFilteredRestaurents] = useState([]);
  const [searchText, setSearchText] = useState('');

  const RestaurentCardPromoted = withPromotedLabel(RestoCard);
  //Fetch restaurent data
  useEffect(() => {
    fetchData();
  }, []);
  //Fetch API data
  const fetchData = async () => {
    const data = await fetch(
      'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );

    const json = await data.json();

    // Optional chaining
    setListOfRestaurents(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurents(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log(
    //   json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // console.log(json?.data?.cards[5]);
  };
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>You are Offline. Please check internet Connection.</h1>;
  }
  return listOfRestaurents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              console.log(searchText);
              const filteredRestaurent = listOfRestaurents.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurents(filteredRestaurent);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurents.filter(
                (res) => res.info.avgRating > 4.5
              );
              setListOfRestaurents(filteredList);
            }}
          >
            Top Rated Restaurents
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurents.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={'/restaurents/' + restaurant.info.id}
          >
            {restaurant.info.promoted ? (
              <RestaurentCardPromoted resData={restaurant.info} />
            ) : (
              <RestoCard resData={restaurant.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
