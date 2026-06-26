import { Row, Col } from 'react-bootstrap';

const HomeSection = ({ title, text, image, imageLeft = true, alt }) => (
  <section className="home-section py-5">
    <Row className={`align-items-center ${imageLeft ? '' : 'flex-md-row-reverse'}`}>
      <Col md={6} className="mb-4 mb-md-0">
        {imageLeft ? (
          <>
            <h2 className="section-title text-center mb-4">{title}</h2>
            <p className="section-text">{text}</p>
          </>
        ) : (
          <img src={image} alt={alt || title} className="section-img img-fluid rounded shadow" />
        )}
      </Col>
      <Col md={6}>
        {imageLeft ? (
          <img src={image} alt={alt || title} className="section-img img-fluid rounded shadow" />
        ) : (
          <>
            <h2 className="section-title text-center mb-4">{title}</h2>
            <p className="section-text">{text}</p>
          </>
        )}
      </Col>
    </Row>
  </section>
);

export default HomeSection;
