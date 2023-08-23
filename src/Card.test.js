import React from "react";
import Card from "./Card"
import { render } from "@testing-library/react";

//smoke test
it("renders without crashing", function () {
  render(<Card caption="cap"
               src="./image1.jpg"
               currNum={1}
               totalNum={3}/>)
})

//snapshot
it("matches snapshot", function () {
  const { asFragment } = render(<Card caption="cap"
               src="./image1.jpg"
               currNum={1}
               totalNum={3}/>)
  expect(asFragment()).toMatchSnapshot();
})