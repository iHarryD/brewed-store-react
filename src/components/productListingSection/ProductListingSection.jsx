import "./css/productListingSectionStyle.css";
import { motion } from "framer-motion";

export default function ProductListingSection({ children }) {
  return (
    <motion.section layout className="section --product-listing --has-gap">
      {children}
    </motion.section>
  );
}
