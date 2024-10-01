import GodRays from "@/ui/godrays";
import { Spaced } from "@/ui/spacing";
import { Lobby } from "../_comp/content";
import { Nav } from "@/ui/navbar";

export const MainContent = () => (
  <main className="h-screen w-screen portrait:overflow-clip">
    <Nav />
    <div className="relative z-[40] grid h-[calc(100vh-200px)] grid-cols-1 md:grid-cols-2">
      <div className="flex h-full w-full items-center justify-center portrait:hidden">
        <div>
          <Spaced text="Accelerate" />
          <Spaced text="into the Future." />
        </div>
      </div>

      <Lobby />
    </div>

    <div>
      <GodRays />
    </div>
  </main>
);
