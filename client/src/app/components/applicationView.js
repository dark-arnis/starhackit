import React, {createElement as h} from "react";
import { observer } from "mobx-react";
import glamorous from "glamorous";
import navBar from "./navbar";
import footer from "./footer";
import asyncView from "components/AsyncView";
// eslint-disable-next-line no-undef
const version = __VERSION__;

export default context => {
  const { theme, parts } = context;
  const { palette } = theme;
  const NavBar = navBar(context);
  const Footer = footer(context);
  const AsyncView = asyncView(context);

  const AppRoot = glamorous("div")({
    display: "flex"
  });

  const AppView = glamorous("div")(() => ({
    flex: "1 1 auto",
    overflow: "auto",
    color: palette.textPrimary
  }));

  const MainView = glamorous("div")({
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  });

  function ApplicationView({ authStore, themeStore, children }) {
    return (
      <AppRoot>
        <AppView>
          <NavBar authenticated={authStore.authenticated} />
          <MainView>
            {children}
          </MainView>
          <Footer version={version} />
        </AppView>
        {themeStore.open &&
          <AsyncView
            getModule={() => System.import("../parts/theme/ThemeView")}
          />}
      </AppRoot>
    );
  }

  return ({ children }) =>
    h(observer(ApplicationView), {
      authStore: parts.auth.stores().auth,
      themeStore: parts.theme.stores().sideBar,
      children
    });
};
