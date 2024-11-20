import type { User } from "firebase/auth";

export interface OverviewProps {
  user: User | null;
}
