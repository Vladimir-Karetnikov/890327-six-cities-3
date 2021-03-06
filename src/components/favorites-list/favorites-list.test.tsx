import * as React from "react";
import * as renderer from "react-test-renderer";
import FavoritesList from "./favorites-list";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers";
import configureStore from "redux-mock-store";
import {BrowserRouter as Router} from 'react-router-dom';

const mockStore = configureStore([]);

it(`Should render favorites-list`, () => {
  const store = mockStore({
    DATA: {
      bookmarkedOffers: offers,
      cities: [`Amsterdam`, `Paris`, `Cologne`]
    },
    USER: {
      isAuthorized: true,
      user: {email: `some@email.com`}
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <FavoritesList bookmarkedOffers={offers} cities={[`Amsterdam`, `Paris`, `Cologne`]} />
          </Provider>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
