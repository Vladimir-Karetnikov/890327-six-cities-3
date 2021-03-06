import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewForm from "./review-form";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Should render Review form`, () => {
  const store = mockStore({
    DATA: {
      commentStatus: `SUCCESS`
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <ReviewForm id={`23`} />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
