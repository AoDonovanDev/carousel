import { render, fireEvent } from "@testing-library/react";
import Card from "./Card"
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

//smoke
it("renders without crashing", function () {
  render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"
    />)
})

//snapshot
it("matches snapshot", function () {
  const { asFragment } = render(<Card caption="cap"
               src="./image1.jpg"
               currNum={1}
               totalNum={3}/>)
  expect(asFragment()).toMatchSnapshot();
})




it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  //move forward so we can move back
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  //test left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow)
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("doesnt show left arrow on first slide", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();
});

it("doesnt show right arrow on last slide", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow)

  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});


