import { type Component, Show } from "solid-js";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import { Toaster } from "~/components/ui/sonner";

const HomePage = lazy(() => import("./(www)"));
const AuthRouter = lazy(() => import("./(auth)/router"));
const NotFoundPage = lazy(() => import("./not-found"));

const SystemRouting: Component<{}> = (props) => {
  const storageManager = createLocalStorageManager("solid-ui-theme");

  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            {props.children}
          </ColorModeProvider>
          <Toaster />
        </>
      )}
    >
      {/* WWW Site */}
      <Show
        when={window.location.host.startsWith("www.localhost") ||
          window.location.host.startsWith("localhost")}
      >
        <Route path={"/"} component={HomePage} />
      </Show>
      {/* Authentication site */}
      <Show
        when={window.location.host.startsWith("auth.localhost")}
      >
        <AuthRouter />
      </Show>
      <Route path={"*"} component={NotFoundPage} />
    </Router>
  );
};

export default SystemRouting;
