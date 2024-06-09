import Image from "next/image";

const defaultLists = [{
  name: '前端后花园周刊#14',
  path: '',
  date: '2024.06.10'
},{
  name: '前端后花园周刊#13',
  path: '',
  date: '2024.06.10'
}];

export default function Home() {
  return (
    <div className="mt-10 ml-4 h-screen">
      <div className="text-2xl mb-4">全部周刊列表</div>
      {
        defaultLists.map((item,index) => (
          <div key={index} className="pb-4">{item.name} - {item.date}</div>
        ))
      }
    </div>
  );
}
