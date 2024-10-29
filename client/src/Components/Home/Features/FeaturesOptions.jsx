import { useTranslation } from "react-i18next";
import { PiForkKnifeBold } from "react-icons/pi";
import { TiLeaf, TiWiFi } from "react-icons/ti";
import { FaPeopleGroup, FaTurnDown } from "react-icons/fa6";
import { GiCoffeeCup } from "react-icons/gi";
import { MdOutlineRoomService } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";

export const useFeatures = () => {
  const { t } = useTranslation();

  return [
    {
      name: t("home.Features.items.sustainability"),
      icon: <TiLeaf />,
    },
    {
      name: t("home.Features.items.restaurant"),
      icon: <PiForkKnifeBold />,
    },
    {
      name: t("home.Features.items.meetingSpace"),
      icon: <FaPeopleGroup />,
    },
    {
      name: t("home.Features.items.freeWifi"),
      icon: <TiWiFi />,
    },
    {
      name: t("home.Features.items.freeCoffee"),
      icon: <GiCoffeeCup />,
    },
    {
      name: t("home.Features.items.roomService"),
      icon: <MdOutlineRoomService />,
    },
    {
      name: t("home.Features.items.wakeupCalls"),
      icon: <LuPhoneCall />,
    },
    {
      name: t("home.Features.items.housekeeping"),
      icon: <MdOutlineDone />,
    },
    {
      name: t("home.Features.items.serviceRequest"),
      icon: <MdOutlineDone />,
    },
    {
      name: t("home.Features.items.ottAccess"),
      icon: <MdOutlineDone />,
    },
    {
      name: t("home.Features.items.24hService"),
      icon: <TbClock24 />,
    },
    {
      name: t("home.Features.items.turndown"),
      icon: <FaTurnDown />,
    },
  ];
};
