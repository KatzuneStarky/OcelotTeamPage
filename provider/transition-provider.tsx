"use client";

import Navbar from "@/components/layout/navbar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();

    return (
        <AnimatePresence mode="wait" key={pathName}>
            <Navbar />
            {children}
            <motion.div
                className="absolute top-0 left-0 w-full h-[100vh] bg-white origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="absolute top-0 left-0 w-full h-[100vh] bg-black origin-top"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
        </AnimatePresence>
    );
};

export default TransitionProvider;