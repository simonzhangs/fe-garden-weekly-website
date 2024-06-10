import Image from "next/image";
import Link from "next/link";
import { fetchWeeklyLists } from './lib/data'

// const defaultLists = [{
//   name: '前端后花园周刊#14',
//   path: '',
//   date: '2024.06.10'
// },{
//   name: '前端后花园周刊#13',
//   path: '',
//   date: '2024.06.10'
// }];
interface weeklyItem {
  id: number;
}

export default async function Home() {
  const weeklyLists = await fetchWeeklyLists();
  weeklyLists.forEach((item) => {
     const { publish_date: currentDate } = item || {};
     // 获取年份
    var year = currentDate.getFullYear();
    // 获取月份（需要加1）
    var month = currentDate.getMonth() + 1;
    // 获取日期
    var day = currentDate.getDate();
    item.date = `${year}-${month}-${day}`;
    console.log(item.title)
  });
  return (
    <div className="ml-4">
      <div className="text-2xl mb-4">全部周刊列表</div>
      {
        weeklyLists.map((item,index) => (
          <div key={index} className="pb-4">
            <Link href={item.link}>{item.title}</Link>
            - {item.date}
          </div>
        ))
      }
    </div>
  );
}
