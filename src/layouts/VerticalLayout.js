import React, { PureComponent } from "react";
import classnames from "classnames";
import Customizer from "../components/@vuexy/customizer/Customizer";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Row, Col } from "reactstrap";
import axios from "../axios"
import { connect } from "react-redux";

import GenesisFile from   './Genesis_labels.csv'
import ECGFile from   './ECG_labels.csv'

import Papa from 'papaparse';



import LineChart from   '../views/charts/chart-js/ChartJsLineChart'


import { Input, Button, CustomInput } from "reactstrap";

import { Truck, User, FileText, DollarSign, Eye } from "react-feather";

import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
} from "../redux/actions/customizer/index";


const Xs = []
for (let i = 0; i < 1500; i++) {
  Xs.push(i);
}

const real_labels = []
for (let i = 0; i < 1500; i++) {
  if ((i>400 && i < 520) ||  (i> 1200 && i < 1280) ){
    real_labels.push(1);
  } else {
    real_labels.push(0);
  }
}

const Genesis_labels = []

Papa.parse(GenesisFile, {
  download: true,
  complete: function (input) {
   Genesis_labels.push(input.data)   
  }
});
const ECG_labels = []

Papa.parse(ECGFile, {
  download: true,
  complete: function (input) {
   ECG_labels.push(input.data)   
  }
});




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
    algorithm: "USAD",
    algorithms: ["USAD",'2D-CNN','SCOS'],
    dataset: "SMAP",
    datasets: ["SMAP",'ECG','MSLF7',"MSLC1","Genesis","HSS"],
    scos_params: {
      beta: "",
      lambda: "",
      decay: "",
      w: "",
      th_pa: "",
      th_pw: "",  
    },
    scos_config : {
      convex:false, 
      temp_depend :'TD', 
      win : true,
    },
    find_threshold : false,
    labelColor : '#6e6b7b',
    
    tooltipShadow : 'rgba(0, 0, 0, 0.25)',
    
    gridLineColor : 'rgba(200, 200, 200, 0.2)',
    
    lineChartPrimary : '#666ee8',
    
    lineChartDanger : '#ff4961',
    
    warningColorShade : '#ffe802',

    fetch_data  : false,


    labels : {
      Genesis : Genesis_labels,
      ECG: ECG_labels
    },

    data : {
      labels: Xs,
      datasets: [
        {
          data: real_labels,
          label: 'Real Targets',
          borderColor: "#666ee8",
          lineTension: 0,
          pointStyle: 'circle',
          backgroundColor: "#666ee8",
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: "#666ee8",
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: 'rgba(0, 0, 0, 0.25)'
        },
      ]
    },
  
    data1 : {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      datasets: [
        {
          data: [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
          label: 'Real Targets',
          borderColor: "#666ee8",
          lineTension: 0,
          pointStyle: 'circle',
          backgroundColor: "#666ee8",
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: "#666ee8",
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: 'rgba(0, 0, 0, 0.25)'
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
          label: 'Predicted Targets PW',
          borderColor: '#ff4961',
          lineTension: 0,
          pointStyle: 'circle',
          backgroundColor: '#ff4961',
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: '#ff4961',
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: 'rgba(0, 0, 0, 0.25)'
        },
      ]
    },
  
    data2 : {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      datasets: [
        {
          data: [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
          label: 'Real Targets',
          borderColor: "#666ee8",
          lineTension: 0,
          pointStyle: 'circle',
          backgroundColor: "#666ee8",
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: "#666ee8",
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: 'rgba(0, 0, 0, 0.25)'
        },
        {
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
          label: 'Predicted Targets PA',
          borderColor: '#ff4961',
          lineTension: 0,
          pointStyle: 'circle',
          backgroundColor: '#ff4961',
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 5,
          pointBorderColor: 'transparent',
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: '#ff4961',
          pointShadowOffsetX: 1,
          pointShadowOffsetY: 1,
          pointShadowBlur: 5,
          pointShadowColor: 'rgba(0, 0, 0, 0.25)'
        },
      ]
    },
    
    errorAlert :false , 
    errorText : "Network problem",


  };

  handleAlert = (state, value, text) => {
    this.setState({ [state]: value, errorText: text });
  };
  



  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState((prevState) => ({
        width: window.innerWidth,
      }));
    }
  };

  handleCustomizer = (bool) => {
    this.setState({
      customizer: bool,
    });
  };

  componentDidMount() {
    this.mounted = true;
    let {
      location: { pathname },
      app: {
        customizer: { theme, direction },
      },
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
        customizer: { theme, sidebarCollapsed },
      },
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
          sidebarState: sidebarCollapsed,
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

  handleCollapsedMenuPaths = (item) => {
    let collapsedPaths = this.collapsedPaths;
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item);
      this.collapsedPaths = collapsedPaths;
    }
  };

  toggleSidebarMenu = (val) => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent,
    });
  };


  handleRadioConvex = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        convex : true
      }
    })
  }
  handleRadioNonConvex = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        convex : false
      }
    })
  }

  handleRadioWin = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        win : true
      }
    })
  }
  handleRadioNonWin = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        win : false
      }
    })
  }
  handleRadioK = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        temp_depend : "K"
      }
    })
  }
  handleRadioTD = ()=> {
    this.setState({
      scos_config:{
        ...this.state.scos_config, 
        temp_depend : "TD"
      }
    })
  }


  sidebarMenuHover = (val) => {
    this.setState({
      sidebarState: val,
    });
  };

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden,
            });
          }
        });
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden,
      });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleCurrentLanguage = (lang) => {
    this.setState({
      currentLang: lang,
    });
  };

  handleAppOverlay = (value) => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true,
      });
    } else if (value.length < 0 || value === "") {
      this.setState({
        appOverlay: false,
      });
    }
  };

  handleAlgoChange = (value) => {
    this.setState({
      algorithm: value,
    });
  };
  handleDatasetChange = (value) => {

    const Xs = []
    console.log(this.state.labels[value][0].length)
    for (let i = 0; i < this.state.labels[value][0].length; i++) {
      Xs.push(i);
    }

    this.setState({
      data : {
        labels : Xs,
        datasets : [
          {
            ...this.state.data.datasets[0],
            data : this.state.labels[value]
          }
        ]
      },
      dataset: value,
    });
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false,
    });
  };
  handleFindTH = () => {
    this.setState({
      find_threshold: ! this.state.find_threshold,
    });
  };



  fetchData = async () =>{
    try {
      const response = await axios.get(`/`);
      const results_pa  = response.data.results_pa
      const results_pw  = response.data.results_pw
      var Xs = [];
      for (var i = 0; i <= results_pa.length ; i++) {
        Xs.push(i);
      }

      this.setState({
        data1 : {
          labels : Xs,
          datasets  : [
            {
              ...this.state.data1.datasets[0],
              data : real_labels 
            },
            {
              ...this.state.data1.datasets[1],
              data : results_pw 
            }
          ] 
        },
        data2 : {
          labels : Xs,
          datasets  : [
            {
              ...this.state.data2.datasets[0],
              data : real_labels
            },
            {
              ...this.state.data2.datasets[1],
              data : results_pa
            }
          ] 
        },
        fetch_data: true,
      })

    } catch (err) {
      const error_message =
        err.message === "Network Error"
          ? "Une erreur s'est produite."
          : "Vérifiez votre connexion !";
      this.handleAlert("errorAlert", true, error_message);
    }
  }

  render() {
    console.log(this.state.data)
    let appProps = this.props.app.customizer;
    let menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark",
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
      handleAlgoChange: this.handleAlgoChange,
      handleDatasetChange: this.handleDatasetChange,
      algorithm : this.state.algorithm,
      dataset : this.state.dataset,
      handleRadioConvex : this.handleRadioConvex,
      handleRadioNonConvex : this.handleRadioNonConvex,
      handleRadioNonWin : this.handleRadioNonWin,
      handleRadioWin : this.handleRadioWin,
      handleRadioK : this.handleRadioK,
      handleRadioTD : this.handleRadioTD,
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
      navbarType: appProps.navbarType,
    };

    let footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop,
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
            "theme-primary": !menuThemeArr.includes(appProps.menuTheme),
          }
        )}
      >
        <Sidebar {...sidebarProps} />

        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true,
          })}
          onClick={this.handleAppOverlayClick}
        >
          {/* <Navbar {...navbarProps} /> */}
          <div className="content-wrapper">
            {/* ADDED CODE */}

            <Row>
              <div
                className="d-flex flex-sm-row justify-content-center"
                style={{
                  backgroundColor: "#ffc4ad",
                  borderRadius: "15px",
                  width: "100%",
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
                              {this.state.algorithm=="SCOS" ? 
                              <div>
                              <h7>
                                Convex : {this.state.scos_config.convex==false ? "No": 'Yes'}
                              </h7> 
                              <br></br>
                              <h7>
                                Windows : {this.state.scos_config.win==false ? "No": 'Yes'}
                              </h7> 
                              <br></br>
                              <h7
                              >
                                Temporal Dependency : {this.state.scos_config.temp_depend}
                              </h7> 
                              </div>
                              
                              : ""
                            }
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
                                <CustomInput 
                                type='checkbox' 
                                id='portion' 
                                name='portion' inline label='Portion Dataset' />
                                <CustomInput 
                                type='checkbox' 
                                id='threshold' 
                                name='threshold' inline label='Find Threshold'
                                onChange={this.handleFindTH}
                                />
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
                    SCOS Parameters
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
                            height: "2rem",
                          }}
                          value={this.state.scos_params.beta}
                          onChange={(e) => {
                            this.setState({
                              scos_params: {
                                ...this.state.scos_params,
                                beta: e.target.value
                              },
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div>
                        <small>Lambda</small>
                        <Input
                          style={{
                            width: "5rem",
                            height: "2rem",
                          }}
                          value={this.state.lambda}
                          onChange={(e) => {
                            this.setState({
                              scos_params: {
                                ...this.state.scos_params,
                                lambda: e.target.value,
                              }
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div>
                        <small>Decay</small>
                        <Input
                          style={{
                            width: "5rem",
                            height: "2rem",
                          }}
                          value={this.state.scos_params.decay}
                          onChange={(e) => {
                            this.setState({
                              scos_params : {
                                ...this.state.scos_params,
                                decay: e.target.value,
                              }
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div>
                        <small>Pulsation</small>
                        <Input
                          style={{
                            width: "5rem",
                            height: "2rem",
                          }}
                          value={this.state.scos_params.pul}
                          onChange={(e) => {
                            this.setState({
                              scos_params: {
                                ...this.state.scos_params,
                                pul: e.target.value,
                              }
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div>
                        <small>Threshold PA</small>
                        <Input
                          style={{
                            width: "5rem",
                            height: "2rem",
                          }}
                          value={this.state.scos_params.th_pa}
                          onChange={(e) => {
                            this.setState({
                              scos_params: {
                                ...this.state.scos_params,
                                th_pa: e.target.value,
                              }
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div>
                        <small>Threshold PW</small>
                        <Input
                          style={{
                            width: "5rem",
                            height: "2rem",
                          }}
                          value={this.state.scos_params.th_pw}
                          onChange={(e) => {
                            this.setState({
                              scos_params: {
                                ...this.state.scos_params,
                                th_pw: e.target.value,
                              }
                            });
                          }}
                          disabled={this.state.algorithm != "SCOS"}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-sm-row justify-content-between align-items-center">
                      <div className="d-flex flex-sm-row justify-content-between align-items-center">
                        <Button
                          style={{
                            marginTop: "1rem",
                            marginRight: "1rem",
                            paddingTop: "0.6rem",
                            paddingBottom: "0.6rem",
                            paddingRight: "0.8rem",
                            paddingLeft: "0.8rem",
                          }}
                          // size="8px"
                          color="primary"
                          onClick={this.fetchData}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </Row>

            {this.state.fetch_data ? 
            <Row>
            <Col xl="6"  sm="12">
           <LineChart
           title = 'Results Using PW'
            data = {this.state.data1}
            warningColorShade={this.state.warningColorShade}
            lineChartDanger={this.state.lineChartDanger}
            lineChartPrimary={this.state.lineChartPrimary}
            labelColor={this.state.labelColor}
            tooltipShadow={this.state.tooltipShadow}
            gridLineColor={this.state.gridLineColor}
          />  
              </Col>
              <Col xl="6"  sm="12">
           <LineChart
            title = 'Results Using PA'
            data = {this.state.data2}
            warningColorShade={this.state.warningColorShade}
            lineChartDanger={this.state.lineChartDanger}
            lineChartPrimary={this.state.lineChartPrimary}
            labelColor={this.state.labelColor}
            tooltipShadow={this.state.tooltipShadow}
            gridLineColor={this.state.gridLineColor}
            />  
              </Col>
            </Row>
            :
            <Row>
              <Col xl="6"  sm="12">
            <LineChart
              title = 'Real targets'
              data = {this.state.data}
              warningColorShade={this.state.warningColorShade}
              lineChartDanger={this.state.lineChartDanger}
              lineChartPrimary={this.state.lineChartPrimary}
              labelColor={this.state.labelColor}
              tooltipShadow={this.state.tooltipShadow}
              gridLineColor={this.state.gridLineColor}
              />  
              </Col>
            </Row>
            
            }



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
const mapStateToProps = (state) => {
  return {
    app: state.customizer,
  };
};
export default connect(mapStateToProps, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
})(VerticalLayout);
