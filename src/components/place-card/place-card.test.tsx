import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import offers from "../../__mocks__/offers";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {Offer, City} from "../../interfaces";

const mockStore = configureStore([]);

const cities: City[] = [
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
];

const hoveredCard: Offer = offers[0];

it(`Render place-card`, () => {
  const store = mockStore({
    DATA: {
      offers,
      cities,
      currentCity: {
        name: `Amsterdam`,
        coords: [52.370216, 4.895168],
        zoom: 10
      },
      bookmarkStatus: `SUCCESS`
    },
    APPLICATION: {
      currentSortType: `Popular`,
      hoveredCard
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <PlaceCard
              rentOffer={offers[0]}
            />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
