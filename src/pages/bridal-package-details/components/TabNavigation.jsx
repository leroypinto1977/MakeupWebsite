import React from "react";
import Icon from "../../../components/AppIcon";

const TabNavigation = ({ activeTab, onTabChange }) => {
  const navRef = React.useRef(null);

  const tabs = [
    {
      id: "packages",
      label: "Packages",
      icon: "Crown",
      description: "Compare our bridal packages",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: "Image",
      description: "View our work gallery",
    },
    {
      id: "process",
      label: "Process",
      icon: "MapPin",
      description: "Your bridal journey timeline",
    },
  ];

  return (
    <div
      ref={navRef}
      className="border-b border-border bg-background/95 backdrop-blur-sm w-full"
    >
      <div className="container-padding">
        <nav className="flex justify-center space-x-0 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 lg:px-6 py-4 border-b-2 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap ${
                activeTab === tab?.id
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <div className="text-left">
                <div className="font-medium text-sm lg:text-base">
                  {tab?.label}
                </div>
                <div className="text-xs text-muted-foreground hidden lg:block">
                  {tab?.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
