import React, { PureComponent } from "react";
import classnames from "classnames";
import Customizer from "../components/@vuexy/customizer/Customizer";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {Row, Col} from 'reactstrap'
import { connect } from "react-redux";

import {  Input, Button } from "reactstrap";

import { Truck, User, FileText, DollarSign, Eye } from "react-feather";

import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
} from "../redux/actions/customizer/index";

class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: this.props.app.customizer.sidebarCollapsed,
    layout: this.props.app.customizer.theme,
    collapsedContent: this.props.app.customizer.sidebarCollapsed,
    sidebarHidden: false,
    currentLang: "fr",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
    algorithm: "SCOS",
    dataset : "SMAP",
    beta : 12
  };
  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }));
    }
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    });
  };

  componentDidMount() {
    this.mounted = true;
    let {
      location: { pathname },
      app: {
        customizer: { theme, direction }
      }
    } = this.props;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = theme;
      let dir = direction;
      if (dir === "rtl")
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      return layout === "dark"
        ? document.body.classList.add("dark-layout")
        : layout === "semi-dark"
        ? document.body.classList.add("semi-dark-layout")
        : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      location: { pathname },
      app: {
        customizer: { theme, sidebarCollapsed }
      }
    } = this.props;

    let layout = theme;
    if (this.mounted) {
      if (layout === "dark") {
        document.body.classList.remove("semi-dark-layout");
        document.body.classList.add("dark-layout");
      }
      if (layout === "semi-dark") {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("semi-dark-layout");
      }
      if (layout !== "dark" && layout !== "semi-dark") {
        document.body.classList.remove("dark-layout", "semi-dark-layout");
      }

      if (
        prevProps.app.customizer.sidebarCollapsed !==
        this.props.app.customizer.sidebarCollapsed
      ) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        });
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(true);
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        !this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(false);
      }
    }
  }

  handleCollapsedMenuPaths = item => {
    let collapsedPaths = this.collapsedPaths;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = val => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    });
  };

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    });
  };

  handleAppOverlay = value => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true
      });
    } else if (value.length < 0 || value === "") {
      this.setState({
        appOverlay: false
      });
    }
  };


  test = (e)=>{
    this.setState({
      algorithm : "USAD",
      dataset : "ECG"
    })
    console.log(this.state.algorithm)
  }

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    });
  };

  render() {
    let appProps = this.props.app.customizer;
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark"
    ];
    let sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width,
      test : this.test
    };
    let navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };

    let footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };

    let customizerProps = {
      customizerState: this.state.customizer,
      handleCustomizer: this.handleCustomizer,
      changeMode: this.props.changeMode,
      changeNavbar: this.props.changeNavbarColor,
      changeNavbarType: this.props.changeNavbarType,
      changeFooterType: this.props.changeFooterType,
      changeMenuTheme: this.props.changeMenuColor,
      collapseSidebar: this.props.collapseSidebar,
      hideScrollToTop: this.props.hideScrollToTop,
      activeMode: appProps.theme,
      activeNavbar: appProps.navbarColor,
      navbarType: appProps.navbarType,
      footerType: appProps.footerType,
      menuTheme: appProps.menuTheme,
      scrollToTop: appProps.hideScrollToTop,
      sidebarState: appProps.sidebarCollapsed,

    };
    return (
      <div
        className={classnames(
          `wrapper vertical-layout theme-${appProps.menuTheme}`,
          {
            "menu-collapsed":
              this.state.collapsedContent === true && this.state.width >= 1200,
            "fixed-footer": appProps.footerType === "sticky",
            "navbar-static": appProps.navbarType === "static",
            "navbar-sticky": appProps.navbarType === "sticky",
            "navbar-floating": appProps.navbarType === "floating",
            "navbar-hidden": appProps.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(appProps.menuTheme)
          }
        )}
      >
        <Sidebar {...sidebarProps} />


        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Navbar {...navbarProps} />
          <div className="content-wrapper">
          {/* ADDED CODE */}
            
          <Row>
          <div
            className="d-flex flex-sm-row justify-content-center"
            style={{
              backgroundColor: "#ffc4ad",
              borderRadius: "15px",
              width: "80%",
              marginRight: "1rem",
              height: "15rem",
              padding: "2rem",
              marginBottom: "35px",
            }}
          >
            <div style={{ width: "60%" }}>
              <Row noGutters="false">
                <Col>
                  <div
                    className="align-items-center justify-content-center d-flex"
                    style={{
                      backgroundColor: "#ffe3d8",
                      borderRadius: "18px",
                      width: "80%",
                      height: "11rem",
                    }}
                  >
                    <Col>
                      <div className="align-self-center">
                        <div>
                          <h5
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "1rem",
                              fontSize: "14px",
                            }}
                          >
                            Algorithm : {this.state.algorithm}
                          </h5>
                          <h5
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "1rem",
                              fontSize: "14px",
                            }}
                          >
                            Dataset : {this.state.dataset}
                          </h5>
                    
                        </div>
                      </div>
                    </Col>
                  </div>
                </Col>
                <Col>
                  <div
                    className="align-items-center justify-content-center d-flex"
                    style={{
                      backgroundColor: "#ffe3d8",
                      borderRadius: "18px",
                      width: "80%",
                      height: "11rem",
                    }}
                  >
                    <Col>
                      <div className="align-self-center">
                        <div>
                          <h5
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "1rem",
                              fontSize: "14px",
                            }}
                          >
                            Find threshold (radio button)
                          </h5>

                          <h5
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "1rem",
                              fontSize: "14px",
                            }}
                          >
                            Split dataset (radio button)
                          </h5>
                          
                        </div>
 
                      </div>
                    </Col>
                  </div>
                </Col>
              </Row>
            </div>
            <div
              style={{
                backgroundColor: "#ffe3d8",
                borderRadius: "18px",
                width: "60%",
                height: "100%",
                padding: "1rem",
              }}
            >
              <h5
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  fontSize: "14px",
                }}
              >
                SCOS config
              </h5>
              <div
                style={{
                  marginTop: "2rem",
                  overflowX: "scroll",
                }}
                className="d-flex flex-sm-row justify-content-between align-items-center scroll-hide"
              >


                {/* PARAMS 1 */}
                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                  <div>
                    <small>Beta</small>
                    <Input
                    style={{
                      width: "5rem",
                      height:"2rem"
                    }}
                    value={this.state.beta}
                    onChange={(e) => {
                      this.setState({
                        beta: e.target.value,
                      });
                    }}
                  />
                  </div>
                </div>



                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                  <div>
                    <small>Lambda</small>
                    <Input
                    style={{
                      width: "5rem",
                      height:"2rem"
                    }}
                    value={this.state.lambda}
                    onChange={(e) => {
                      this.setState({
                        lambda: e.target.value,
                      });
                    }}
                  />
                  </div>
                </div>


                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                  <div>
                    <small>Decay</small>
                    <Input
                    style={{
                      width: "5rem",
                      height:"2rem"
                    }}
                    value={this.state.decay}
                    onChange={(e) => {
                      this.setState({
                        decay: e.target.value,
                      });
                    }}
                  />
                  </div>
                </div>

                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                  <div>
                    <small>Pulsation</small>
                    <Input
                    style={{
                      width: "5rem",
                      height:"2rem"
                    }}
                    value={this.state.pul}
                    onChange={(e) => {
                      this.setState({
                        pul: e.target.value,
                      });
                    }}
                  />
                  </div>
                </div>





                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                <div className="d-flex flex-sm-row justify-content-between align-items-center">
                <Button
                    style={{
                        marginTop:"1rem",
                        marginRight:"1rem",
                        paddingTop:"0.6rem",
                        paddingBottom:"0.6rem",
                        paddingRight:"0.8rem",
                        paddingLeft:"0.8rem"
                    }}
                    // size="8px"
                    color ="primary"

                    >
                        Submit
                    </Button>
                </div>
                </div>

                
              </div>
            </div>
          </div>
        </Row>            

















            {/*  */}
          </div>
        </div>

        <Footer {...footerProps} />
        {appProps.disableCustomizer !== true ? (
          <Customizer {...customizerProps} />
        ) : null}
        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    app: state.customizer
  };
};
export default connect(mapStateToProps, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(VerticalLayout);
