import { useState } from "react";
import "./popover.css";

export const Popover = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showPopover = () => {
    setIsVisible(true);
  };

  const hidePopover = () => {
    setIsVisible(false);
  };
  return (
    <div className="popover-container">
      <div
        className="trigger"
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
      </div>
      {isVisible && (
        <div
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
          className="popover-content"
        >
          {content}
        </div>
      )}
    </div>
  );
};
