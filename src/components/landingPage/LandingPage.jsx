import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import CoffeeBean1 from "../../assets/coffee-bean-1.jpg";
import CoffeeBean2 from "../../assets/coffee-bean-2.jpeg";
import LoyaltyCard1 from "../../assets/coffee-loyalty-card-1.jpg";
import LoyaltyCard2 from "../../assets/coffee-loyalty-card-2.jpg";
import LoyaltyCard3 from "../../assets/coffee-loyalty-card-3.jpg";

import "./css/landingPageStyle.css";
import { DealOfTheDayCard, SuggestionCard } from "../cards/Cards";
import { featuresData } from "../../data/featuresData";
import FeaturesCarousel from "./FeaturesCarousel";

export default function LandingPage() {
  return (
    <main className="main --landing-page --verticle-flex">
      <section>
        <FeaturesCarousel carouselItems={featuresData} />
      </section>
      <section>
        <h2 className="sub-heading section-heading --h2">Coffee Club</h2>
        <div className="--horizontal-flex --has-gap --centered-flex">
          <motion.div
            className="loyalty-card-container --left"
            initial={{
              scale: 0.8,
            }}
            drag="x"
            dragConstraints={{
              bottom: 5,
              right: 5,
              left: -20,
              top: 5,
            }}
          >
            <img src={LoyaltyCard1} alt="loyalty-card-1" />
          </motion.div>
          <motion.div className="loyalty-card-container --z-index-1">
            <img src={LoyaltyCard2} alt="loyalty-card-2" />
          </motion.div>
          <motion.div
            className="loyalty-card-container"
            initial={{
              scale: 0.8,
            }}
            drag="x"
            dragConstraints={{
              bottom: 5,
              right: 20,
              left: 5,
              top: 5,
            }}
          >
            <img src={LoyaltyCard3} alt="loyalty-card-3" />
          </motion.div>
        </div>
      </section>
      <section>
        <h2 className="sub-heading section-heading --h2">
          Suggestions For You
        </h2>
        <div className="suggestions-container --horizontal-flex --has-gap">
          {[
            {
              heading: "New Arrival",
              text: "Checkout our exclusive range of Arabica coffee bean powder.",
              btnText: "Arabica",
              imgSrc: CoffeeBean1,
              imgAlt: "arabica-beans",
            },
            {
              heading: "New Arrival",
              text: "Checkout our exclusive range of Arabica coffee bean powder.",
              btnText: "Robusta",
              imgSrc: CoffeeBean2,
              imgAlt: "robusta-beans",
            },
          ].map((item) => (
            <SuggestionCard
              heading={item.heading}
              text={item.text}
              btnText={item.btnText}
              imgSrc={item.imgSrc}
              imgAlt={item.imgAlt}
              key={uuidv4()}
            />
          ))}
        </div>
      </section>
      <Link to="/all-products">
        <button className="btn --primary-btn --has-hover-overlay --width-100">
          Show all products
        </button>
      </Link>
    </main>
  );
}
