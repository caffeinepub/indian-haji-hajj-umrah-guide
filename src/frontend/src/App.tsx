import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import DuaLibrary from "./pages/DuaLibrary";
import Expert from "./pages/Expert";
import Flipbook from "./pages/Flipbook";
import HajjGuide from "./pages/HajjGuide";
import Home from "./pages/Home";
import UmrahGuide from "./pages/UmrahGuide";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const umrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/umrah",
  component: UmrahGuide,
});
const hajjRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hajj",
  component: HajjGuide,
});
const duasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/duas",
  component: DuaLibrary,
});
const flipbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flipbook",
  component: Flipbook,
});
const expertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expert",
  component: Expert,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  umrahRoute,
  hajjRoute,
  duasRoute,
  flipbookRoute,
  expertRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { Link };

export default function App() {
  return <RouterProvider router={router} />;
}
