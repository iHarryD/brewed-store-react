import "./css/productListingSectionStyle.css";
import { motion } from "framer-motion";

export default function ProductListingSection({ children, style }) {
  return (
    <motion.section
      layout
      className="section --product-listing --has-gap"
      style={style}
    >
      {children}
    </motion.section>
  );
}
