"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    href: string;
    label: string;
    color: "black" | "white"
};

export const BackButton = ({
    href,
    label,
    color
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            className={cn(
                "font-bold w-full",
                color === "black" ? "text-black dark:text-white" : "text-white dark:text-black"
            )}
            size="lg"
            asChild
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    );
};