import { render, screen, act } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import Hotels from "../components/hotels";
import store from "../redux/configStore";
import data from '../components/list.json';

describe("Hotels page rendering", () => {
  afterEach(() => {
    act(() => store.dispatch({
      type: '',
      payload: data
    }));
  });

  it("check hotels page rendering", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/hotels" element={<Hotels />} />
          </Routes>
          <Hotels />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Hotel List")).toMatchSnapshot();
  });

  it("hotel list page has search box", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/hotels" element={<Hotels />} />
          </Routes>
          <Hotels />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Search...")).toMatchSnapshot();
  });

  it("hotel list has Highcrest hotel", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/hotels" element={<Hotels />} />
          </Routes>
          <Hotels />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Highcrest")).toMatchSnapshot();
  });
});
