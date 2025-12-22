import { motion } from "framer-motion";
import { useState } from "react";

const PhotoStack = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full flex justify-center py-16 overflow-hidden">
      <div className="flex items-center">
        {images.map((img, index) => {
          const isActive = index === activeIndex;
          const isInactive = index !== activeIndex;

          return (
            <motion.div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
              initial={false}
              animate={{
                scale: isActive ? 1.1 : 0.95,
                opacity: isInactive ? 0.65 : 1,
                zIndex: isActive ? 20 : 10,
              }}
              whileHover={{
                scale: isActive ? 1.12 : 1.03,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 22,
              }}
              style={{
                width: "420px",
                height: "520px",
                marginLeft: index === 0 ? "0px" : "-120px",
              }}
            >
              <img
                src={img}
                alt="Regium work"
                className="w-full h-full object-cover"
              />

              {!isActive && (
                <div className="absolute inset-0 bg-black/25" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoStack;
