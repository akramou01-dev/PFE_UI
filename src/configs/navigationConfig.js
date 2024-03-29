import React from "react";
import * as Icon from "react-feather";
import { FaTable, FaHandshake,FaFileInvoice,FaMotorcycle } from "react-icons/fa";
import { IoStatsChart,IoPeopleCircleOutline } from "react-icons/io5";
const navigationConfig = [
  {
    type: "groupHeader",
    groupTitle: "ALGORITHMS",
  },
  {
    id: 1,
    title: "Algorithms",
    type: "item",
    // vu_ens: true,
    icon: <FaTable size={20} />,
    navLink: "/",
  },
  {
    type: "groupHeader",
    groupTitle: "DATASETS",
  },
  {
    id: 2,
    title: "Datasets",
    type: "item",
    // vu_ens: true,
    icon: <FaTable size={20} />,
    navLink: "/",
  },
  {
    id: 3,
    title: "Config Panel",
    type: "panel",
    // vu_ens: true,
    icon: <FaTable size={20} />,
    navLink: "/",
  },
    // {
    //   id: 3,
    //   title: "SCOS configurations",
    //   type: "item",
    //   // vu_ens: true,
    //   icon: <FaTable size={20} />,
    //   navLink: "/",
    // },
  // {
  //   id: "stats",
  //   title: "Statistiques détaillés",
  //   type: "item",
  //   icon: <IoStatsChart size={20}  />,
  //   navLink: "/stats",
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "COMMANDE PARTICULIERS",
  // },
  // {
  //   id: "ordnnance_recue",
  //   title: "Ordonnance reçues",
  //   type: "item",
  //   icon: <Icon.FileText size={20}  />,
  //   navLink: "/ordonnance/recues",
  // },
  // {
  //   id: "client_p",
  //   title: "Client particuliers",
  //   type: "item",
  //   icon: <Icon.Users size={20} />,
  //   navLink: "/client/particuliers",
  // },
  // {
  //   id: "Partenaire",
  //   title: "Partenaires",
  //   type: "item",
  //   icon: <FaHandshake size={20} />,
  //   navLink: "/partenaires",
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "COMMANDE PROFESSIONNELLES",
  // },
  // {
  //   id: "cmnd_recue",
  //   title: "Commandes reçues",
  //   type: "item",
  //   icon: <Icon.File size={20}  />,
  //   navLink: "/commande/recues",
  // },
  // {
  //   id: "client_prof",
  //   title: "Clients professionnelles",
  //   type: "item",
  //   icon: <IoPeopleCircleOutline size={20} />,
  //   navLink: "/client/professionnelles",
  // },
  // {
  //   id: "factures",
  //   title: "Factures",
  //   type: "item",
  //   icon: <FaFileInvoice size={20}  />,
  //   navLink: "/factures",
  // },
  // {
  //   id: "support_pro",
  //   title: "Support pro",
  //   type: "item",
  //   icon: <Icon.Headphones size={20} />,
  //   navLink: "/support_pro",
  // },
  // {
  //   type: "groupHeader",
  //   groupTitle: "LIVRAISON & TOURNÉES",
  // },
  // {
  //   id: "calendrier",
  //   title: "Calendrier des Tournées",
  //   type: "item",
  //   icon: <Icon.Calendar size={20} />,
  //   navLink: "/calendrier_tournées",
  // },
  // {
  //   id: "livreurs",
  //   title: "Livreurs",
  //   type: "item",
  //   icon: <FaMotorcycle size={20} />,
  //   navLink: "/livreurs",
  // },
  // {
  //   id: "carte",
  //   title: "Carte livreurs",
  //   type: "item",
  //   icon: <Icon.Map size={20}  />,
  //   navLink: "/livreurs/carte",
  // },
  // {
  //   id: "SalaireLivrueur",
  //   title: "Salaire livreur",
  //   type: "item",
  //   icon: <Icon.DollarSign size={20}  />,
  //   navLink: "/livreurs/salaire",
  // },

  // {
  //   type: "groupHeader",
  //   groupTitle: "PARAMÉTRES",
  // },
  // {
  //   id: "user",
  //   title: "Administrateur",
  //   type: "item",
  //   icon: <Icon.User size={20} />,
  //   navLink: "/users",
  // },
  
];

export default navigationConfig;
