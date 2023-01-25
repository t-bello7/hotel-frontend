import { render, screen } from "@testing-library/react";
import App from '../App';

test("render App", () => {
  render(<App />);
  expect(screen.getByText("Hotel Booking")).toMatchSnapshot();
});

test("render navigation Hotels Link", () => {
  render(<App />);
  expect(screen.getByText("Hotels")).toMatchSnapshot();
});

test("render navigation Booking Link", () => {
  render(<App />);
  expect(screen.getByText("Booking")).toMatchSnapshot();
});
