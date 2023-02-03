import { render, screen } from "@testing-library/react";
import Home from "../pages/home";

test("render home page", () => {
  render(<Home />);
  expect(screen.getByText("Home")).toMatchSnapshot();
});
