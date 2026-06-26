import { Container, Row, Col } from 'react-bootstrap';

const Home = () => (
  <Container className="home-page-wrap py-4">
    <div className="home-content-card">
      <section className="home-story">
        <h2 className="home-section-title text-center">Our story</h2>
        <p className="home-body-text">
          We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan
          page. Fans were given situations where they had to come up with wacky and fun excuses.
          The person with the best excuse won the Best Excuse Badge and won Pizzeria&apos;s vouchers.
          Their enthusiastic response proved that Pizzeria&apos;s Fresh Pan Pizza is the Tastiest Pan
          Pizza. Ever!
        </p>
        <p className="home-body-text">
          Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist
          the softest, cheesiest, crunchiest, butteriest Domino&apos;s Fresh Pan Pizza. They have been
          leaving the stage in the middle of a performance and even finding excuses to be
          disqualified in a football match.
        </p>
        <p className="home-body-text mb-0">
          We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given
          situations where they had to come up with wacky and fun excuses. The person with the best
          excuse won the Best Excuse Badge and won Domino&apos;s vouchers. Their enthusiastic response
          proved that Pizzeria&apos;s Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
        </p>
      </section>

      <hr className="home-divider" />

      <Row className="home-section-row align-items-center">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"
            alt="Ingredients"
            className="home-section-img"
          />
        </Col>
        <Col md={6}>
          <h3 className="home-subtitle">Ingredients</h3>
          <p className="home-body-text mb-0">
            We&apos;re ruthless about goodness. We have no qualms about tearing up a day-old lettuce
            leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam.
          </p>
        </Col>
      </Row>

      <hr className="home-divider" />

      <Row className="home-section-row align-items-center">
        <Col md={6}>
          <h3 className="home-subtitle">Our Chefs</h3>
          <p className="home-body-text mb-0">
            They make sauces sing and salads dance. They create magic with skill, knowledge, passion,
            and stirring spoons (among other things). They make goodness so good, it doesn&apos;t know
            what to do with itself. We do though. We send it to you.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://cdn.arlapro.com/remote/cdb.arla.com/api/assets/arla-pro-asia/7866c640-b380-4c91-befe-e819841bd36b/header-3.png?w=600&h=400&fit=crop"
            alt="Our Chefs"
            className="home-section-img rounded-chef-img"
          />
        </Col>
      </Row>

      <hr className="home-divider" />

      <Row className="home-section-row align-items-center mb-0">
        <Col md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXRyHXnszLlx41KKM0NFbvqRxVc2lb3YvIw&s?w=1000&h=400"
            alt="45 min delivery"
            
            align="center"
          />
        </Col>
        <Col md={6}>
          <h3 className="home-subtitle mb-0">45 min delivery</h3>
        </Col>
      </Row>
    </div>
  </Container>
);

export default Home;
