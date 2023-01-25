import { render, screen } from "@testing-library/react";
import Home from "../components/home";

test("render home page", () => {
  render(<Home />);
  expect(screen.getByText("Home")).toMatchSnapshot();
});
