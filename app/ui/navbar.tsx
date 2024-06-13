"use client";

import Link from "next/link";
import { ColorCircles } from './colorCircles'

const defaultNavBar = [
  { name: "全部", path: "/" },
  { name: "最新周刊", path: "/weekly" },
];

interface INavBarItem {  
  path: string;  
  name: string;  
}

// NavBar 组件的属性接口  
interface INavBarProps {    
  theme?: string;
  logoName?: string;
  navBar?: INavBarItem[];
} 

export function NavBar({ logoName = '前端后花园周刊', navBar = defaultNavBar }: INavBarProps) {

  return (
    // 导航栏
    <div className="">
      {/* 滚动条 */}
      <div className={`w-full h-4 bg-skin-fill h-7px rounded`}></div>
      {/* logo + 跳链 */}
      <div className="mt-1 mx-56 h-14 flex justify-between">
        {/* logo */}
        <div className={`w-80 text-3xl px-10 py-2 rounded bg-skin-fill`}>
          {logoName}
        </div>
        {/* 跳链 */}
        <div className="flex px-10 py-4">
          {navBar.map((item, index) => (
            <div key={index}>
              <Link href={item.path}>{item.name}</Link>
              <span className="mx-3 inline-block">|</span>
              {/* {index < navBar.length - 1 ? (
                <span className="mx-3 inline-block">|</span>
              ) : null} */}
            </div>
          ))}
          <ColorCircles />
        </div>
      </div>
    </div>
  );
}