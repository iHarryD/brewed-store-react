import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./css/toastsStyle.css";

export function ErrorToast({ text }) {
  return (
    <motion.div
      className="toast error-toast --horizontal-flex"
      initial={{
        x: "50vw",
      }}
      animate={{
        x: 0,
      }}
    >
      {text}
      <FontAwesomeIcon icon={faCircleExclamation} />
    </motion.div>
  );
}

export function SuccessToast({ text }) {
  return (
    <motion.div
      className="toast success-toast --horizontal-flex"
      initial={{
        x: "50vw",
      }}
      animate={{
        x: 0,
      }}
    >
      {text}
      <FontAwesomeIcon icon={faCircleCheck} />
    </motion.div>
  );
}
