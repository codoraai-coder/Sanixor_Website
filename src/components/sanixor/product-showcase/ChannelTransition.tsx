import { motion, useTransform, type MotionValue } from "framer-motion";

export function ChannelTransition({ strength }: { strength: MotionValue<number> }) {
  const interferenceOpacity = useTransform(strength, [0, 0.16, 1], [0, 0.04, 0.7]);
  const flashOpacity = useTransform(strength, [0, 0.55, 1], [0, 0.015, 0.16]);
  const rollPosition = useTransform(strength, [0, 1], ["-35%", "120%"]);

  return (
    <div className="channel-transition" aria-hidden="true">
      <motion.div className="channel-static" style={{ opacity: interferenceOpacity }} />
      <motion.div
        className="channel-roll"
        style={{ opacity: interferenceOpacity, top: rollPosition }}
      />
      <motion.div className="channel-flash" style={{ opacity: flashOpacity }} />
    </div>
  );
}
