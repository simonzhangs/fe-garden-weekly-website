"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

async function fetchWeeklyAllArticles() {
  try {
    // API路由是/api/articles
    const response = await fetch("/api/articles");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export default function NavLink({}) {
  const [articles, setArticles] = useState<string[]>([]);
  const segment = useSelectedLayoutSegment();

  const [beforeIndex, setBeforeIndex] = useState(0);
  const [afterIndex, setAfterIndex] = useState(0);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await fetchWeeklyAllArticles();
        setArticles(fetchedArticles);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching articles:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const length = articles.length;
    // console.log("articles", articles);
    if (length === 0) return;

    const getArticleSegment = (articleUrl: string) => {  
      const parts = articleUrl.split("/weekly/");  
      return parts.length > 1 ? parts[1] : null;  
    };  
    
    // 查找激活的文章索引  
    let activeIndex = articles.findIndex(article => getArticleSegment(article) === segment);  
    
    // 处理 weekly/page 场景取不到 segment，默认认为最新文章页
    if (activeIndex < 0 && segment === null) {
      activeIndex = length - 1;
    }
    console.log("activeIndex", activeIndex, segment);

    let beforeIndex = activeIndex > 0 ? activeIndex - 1 : -1;  
    let afterIndex = activeIndex < length - 1 ? activeIndex + 1 : -1;
    
    setBeforeIndex(beforeIndex);
    setAfterIndex(afterIndex);
  }, [articles, segment]);

  if (error) {
    return <div>Error fetching data: {error?.message}</div>;
  }

  return (
    <div className="flex justify-between items-center h-10 mb-2">
      {articles.length > 1 && (
        <>
          <div className="text-left">
            {beforeIndex > 0 && (
              <Link href={articles[beforeIndex]}>←前一篇</Link>
            )}
          </div>
          <div className="text-right">
            {afterIndex > 0 && (
              <Link href={articles[afterIndex]} className="text-right">
                →后一篇
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
