import Carousel from 'react-bootstrap/Carousel';

function CustomCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className="d-block w-100" src="https://defencedirecteducation.com/wp-content/uploads/2024/01/F9XQL_kaUAA_uD9-1536x649.jpeg" alt="First slide" />
        <Carousel.Caption>
          {/* <h3>First Slide Label</h3>
          <p>Sample description for the first slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="https://defencedirecteducation.com/wp-content/uploads/2024/01/F9XQL_kaUAA_uD9-1536x649.jpeg" alt="Second slide" />
        <Carousel.Caption>
          {/* <h3>Second Slide Label</h3>
          <p>Sample description for the second slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="https://defencedirecteducation.com/wp-content/uploads/2024/01/F9XQL_kaUAA_uD9-1536x649.jpeg" alt="Third slide" />
        <Carousel.Caption>
          {/* <h3>Third Slide Label</h3>
          <p>Sample description for the third slide.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CustomCarousel;
