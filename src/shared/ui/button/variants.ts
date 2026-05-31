import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "p-[5px] cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        waiting: "bg-bet-waiting",
        running: "bg-bet-running",
        crashed: "bg-bet-crashed",
      },
    },
  },
);
