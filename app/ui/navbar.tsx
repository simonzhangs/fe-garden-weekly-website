import Link from "next/link";

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
  logoName?: string;
  navBar?: INavBarItem[];
} 

export function NavBar({ logoName = '前端后花园周刊', navBar = defaultNavBar }: INavBarProps) {

  return (
    // 导航栏
    <div className="">
      {/* 滚动条 */}
      <div className="w-full h-4 bg-main-blue rounded"></div>
      {/* logo + 跳链 */}
      <div className="mt-1 mx-56 h-14 flex justify-between">
        {/* logo */}
        <div className="bg-main-blue w-80 text-3xl px-10 py-2 rounded">
          {logoName}
        </div>
        {/* 跳链 */}
        <div className="flex px-10 py-4">
          {navBar.map((item, index) => (
            <div key={index}>
              <Link href={item.path}>{item.name}</Link>
              {index < navBar.length - 1 ? (
                <span className="mx-3 inline-block">|</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}