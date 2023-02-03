import { render, screen } from "@testing-library/react";
import Booking from "../components/booking";

test("render hotels page", () => {
  render(<Booking />);
  expect(screen.getByText("booking")).toMatchSnapshot();
});
