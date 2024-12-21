import { motion } from "framer-motion";
import { HyperText } from "@/ui/hypertext";
import { Avatar, Card } from "@nextui-org/react";
import type { SelectUser } from "@convex/users/d";
import { cn } from "@/lib/utils";

interface UserCardProps {
  vxuser: SelectUser | null;
}
export const UserCard = ({ vxuser }: UserCardProps) => {
  return (
    <Card
      className={cn(
        "z-[100] h-3/4 w-1/2 animate-enter space-y-2 overflow-hidden rounded-xl bg-chalk text-void shadow-sm dark:bg-chalk/60",
      )}
    >
      <div className="flex h-2/5 w-full items-center gap-3 border-primary p-4 font-inst text-xl">
        Hello,
        <Avatar
          alt={`avatar-of-${vxuser?.nickname}`}
          size="sm"
          src={vxuser?.photo_url}
        />
        <span className="truncate">
          {vxuser ? (vxuser?.nickname ?? vxuser?.email) : null}
        </span>
      </div>
      <div className="z-[60] h-3/5 w-full px-4">
        <motion.section
          initial={{ height: "0%" }}
          animate={{ height: "66%" }}
          transition={{ duration: 2, delay: 3 }}
          className="flex h-2/3 w-full items-start justify-start border-l-[0.33px] border-void"
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 4, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
            className="h-5 border-y-[0.33px] border-e-[0.33px] border-void bg-warning"
          >
            <div className="flex h-5 items-center px-3.5 font-jet text-xs font-light tracking-wider">
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 5 }}
                className="uppercase"
              >
                Status
              </motion.p>
              <motion.div
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "inherit" }}
                transition={{ delay: 5.5 }}
                className="w-fit font-bold"
              >
                <HyperText duration={1500} text="inactive" />
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </Card>
  );
};
