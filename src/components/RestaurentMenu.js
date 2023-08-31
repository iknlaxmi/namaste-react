import { useParams } from 'react-router-dom';
import useRestaurentMenu from '../../utils/useRestaurentMenu';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import RestaurentCategory from './RestaurentCategory';
const RestaurentMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurentMenu(resId);

  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card?.card;
  console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );
  console.log(categories);
  const showIndexDynamic = (index, clickData) => {
    // console.log(clickData);
    if (clickData) {
      setShowIndex(index);
    } else {
      setShowIndex(null);
    }
  };
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      {/*categories Accordions*/}
      {categories.map((category, index) => (
        <RestaurentCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={showIndexDynamic}
          dummy={index}
        />
      ))}
    </div>
  );
};

export default RestaurentMenu;
