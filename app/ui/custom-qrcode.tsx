"use client";

import { useState, useRef, useEffect } from "react";
import { defineCustomElements } from "@bitjson/qr-code";

const defaultConfig = {
  "module-color": "#1c7d43",
  "position-ring-color": "#13532d",
  "position-center-color": "#70c559",
  "mask-x-to-y-ratio": "1.2",
};

interface IQrCodeAttributes extends JSXElements.QrCodeAttributes {
  ref?: any;
}

export enum AnimationPreset {
  FadeInTopDown = "FadeInTopDown",
  FadeInCenterOut = "FadeInCenterOut",
  RadialRipple = "RadialRipple",
  RadialRippleIn = "RadialRippleIn",
  MaterializeIn = "MaterializeIn",
}

const CustomQrcode: React.FC<IQrCodeAttributes> = (props) => {
  const qrCodeRef = useRef<HTMLQrCodeElement | null>(null);

  useEffect(() => {
    defineCustomElements(window);
  }, []);
  const qrCodeProps = {
    ...defaultConfig,
    ...props,
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleQrcodeAnimation = (preset: AnimationPreset | any) => {
    if (qrCodeRef.current) {
      qrCodeRef.current.animateQRCode(preset);
    }
  };

  const handleOpenClick = () => {
    if (isOpen) {
      
      handleQrcodeAnimation((targets: any, _x: any, _y: any, _count: any, entity: string) => ({
        targets,
        from: entity === 'module' ? Math.random() * 200 : 200,
        duration: 500,
        easing: 'cubic-bezier(.5,0,1,1)',
        web: { opacity: [1, 0], scale: [1, 1.1, 0.5] },
      }));
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    } else {
      setIsOpen(true);
      handleQrcodeAnimation(AnimationPreset.RadialRippleIn);
    }
  };

  return (
    <div className="h-56 w-56 fixed right-0 bottom-0">
      <div className="position-relative">
        <button
        //   className="bg-red rounded absolute top-[-1rem] right-4"
          className={`bg-[#1c7d43] text-white p-2 absolute top-[-2rem] rounded-full shadow-lg ${isOpen ? 'right-4 w-20' : 'right-0 w-10 ease-in'
        }`}
          style={{ zIndex: 1 }}
          onClick={handleOpenClick}
        >
          {isOpen ? "关闭" : "打开"}
        </button>
        {true && <qr-code ref={qrCodeRef} {...qrCodeProps}></qr-code>}
      </div>
    </div>
  );
};

export default CustomQrcode;
