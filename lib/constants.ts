import { Iconkeys, VariantKeys } from "@/types";
import { BadgeTypes } from "@/components/ui/badge-icon";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBoltLightning, faCar, faCreditCard, faFile, faHandHoldingDroplet, faHomeAlt, faTv, faUtensils, faWallet, faWifi } from "@fortawesome/free-solid-svg-icons";

export const dashboarMenu = [
  { name: "main", title: "principal", href: "/dashboard" },
  { name: "transactions", title: "transacciones", href: "/dashboard/transactions" },
  { name: "budget", title: "presupuesto", href: "/dashboard/budget" },
  { name: "others", title: "otros", href: "/dashboard/others" },
]

export const goal = {
  control: 'control de mis gastos',
  buy: 'juntar para comprar',
  investment: 'ahorrar para invertir',
  emergency: 'ahorrar para imprevistos',
  other: 'otro'
}

export const icons: Record<Iconkeys, IconDefinition> = {
  home: faHomeAlt,
  drop: faHandHoldingDroplet,
  wallet: faWallet,
  card: faCreditCard,
  file: faFile,
  tv: faTv,
  "water-drop": faHandHoldingDroplet,
  car: faCar,
  lightning: faBoltLightning,
  wifi: faWifi,
  food: faUtensils
};

export const colors: Record<VariantKeys, BadgeTypes["variant"]> = {
  green: "foreground-success",
  purple: "foreground-purple",
  info: "foreground-info",
  error: "foreground-error",
  neutral: "foreground-neutral",
  warning: "foreground-warning",
};

