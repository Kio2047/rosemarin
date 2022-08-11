import { render, screen } from "@testing-library/react";
import RecipeDetails from "../components/RecipeDetails";
import renderWithProvider from "./testUtils/renderWithProvider";
import { freshLoginTestState } from "./testUtils/testStates"
import registerIcons from "./testUtils/registerIcons"

registerIcons();

jest.mock('react-router-dom', () => ({
  // ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: "8398"
  }),
}));

describe("Recipe Details Component", () => {

  test("should match the snapshot", () => {
    const preloadedState = freshLoginTestState;

    const { container } = renderWithProvider(<RecipeDetails />, {
      preloadedState,
    });

    expect(container).toMatchSnapshot();

  })
});