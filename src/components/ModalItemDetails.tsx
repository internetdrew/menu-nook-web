import { Flame } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { morphLayoutTransition } from "./DevicePreviewScreen";
import type { ActiveMenuItem } from "@/constants";

const ModalItemDetails = ({
  activeItem,
  dialogId,
}: {
  activeItem: ActiveMenuItem;
  dialogId: string;
}) => {
  return (
    <div className="device-preview-dialog-scroll flex flex-1 flex-col justify-between overflow-y-scroll px-3 mb-3 pt-4 text-[#1f1a17]">
      <div>
        <motion.p
          id={dialogId}
          layoutId={`menu-item-name-${activeItem.categoryName}-${activeItem.name}`}
          transition={{ layout: morphLayoutTransition }}
          className="text-sm font-semibold tracking-wide"
        >
          {activeItem.name}
        </motion.p>

        <motion.p
          layoutId={`menu-item-description-${activeItem.categoryName}-${activeItem.name}`}
          transition={{ layout: morphLayoutTransition }}
          className="mt-2 text-[10px] leading-5 text-black/62"
        >
          {activeItem.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{
            duration: 0.2,
            delay: 0.05,
            ease: "easeOut",
          }}
          className="mt-4 space-y-5"
        >
          <div className="flex flex-wrap gap-2 text-[8px] font-medium">
            <span className="rounded-full bg-black/6 px-3 py-1.5 text-black/72">
              {activeItem.calories} cal.
            </span>
            {activeItem.signal ? (
              <span className="rounded-full bg-black px-3 py-1.5 text-white">
                {activeItem.signal}
              </span>
            ) : null}
          </div>

          <div className="rounded-md bg-black/4 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center">
                <p className="text-[8px] font-semibold uppercase tracking-normal text-black/38">
                  Spice Level
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-tight text-black/64">
                  {activeItem.spiceLevel <= 2
                    ? "Mild"
                    : activeItem.spiceLevel === 3
                      ? "Medium"
                      : activeItem.spiceLevel === 4
                        ? "Hot"
                        : "Extra Hot"}
                </p>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <>
                    <Flame
                      className={`size-4 ${index < activeItem.spiceLevel ? "text-red-700 fill-[#ef6a3b]" : "text-neutral-400 fill-black/8"}`}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/38">
              Works For
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeItem.worksFor.map((marker) => (
                <span
                  key={`${activeItem.name}-works-for-${marker}`}
                  className="rounded-full bg-[#e3f4eb] px-3 py-1.5 text-[8px] font-medium text-[#3a9b77]"
                >
                  {marker}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/38">
              Allergens
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeItem.allergens.length > 0 ? (
                activeItem.allergens.map((marker) => (
                  <span
                    key={`${activeItem.name}-allergen-${marker}`}
                    className="rounded-full border border-[#f0b7aa] bg-[#fff5f2] px-3 py-1.5 text-[8px] font-medium text-[#d9674a]"
                  >
                    {marker}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-black/8 bg-white px-3 py-1.5 text-[8px] font-medium text-black/55">
                  None listed
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/38">
              Pairs Well With
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeItem.pairsWith.map((pairing) => (
                <span
                  key={`${activeItem.name}-pairing-${pairing}`}
                  className="rounded-full bg-white px-3 py-1.5 text-[8px] font-medium text-black/65 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                >
                  {pairing}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.15rem] border border-black/8 bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-4 text-[9px]">
              <p className="font-semibold uppercase tracking-[0.16em] text-black/38">
                Price
              </p>
              <span className="rounded-full bg-black px-3 py-1.5 text-[9px] font-medium text-white">
                {activeItem.price}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModalItemDetails;
