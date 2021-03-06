import * as React from "react";
import PlaceCard from "../place-card/place-card";
import {Offer} from "../../interfaces";

interface Props {
  bookmarkedOffers: Offer[];
  cities: string[];
}

const FavoritesList: React.FC<Props> = ({bookmarkedOffers, cities}) => {
  if (bookmarkedOffers.length > 0) {
    return (
      <ul className="favorites__list">
        {cities.map((city) => {
          return (
            <li className="favorites__locations-items" key={city}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {bookmarkedOffers.filter((offer) => offer.city.name === city).map((offer) => <PlaceCard rentOffer={offer} key={offer.id} onFavoritesList={true} />)}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
    </div>
  );
};

export default FavoritesList;
