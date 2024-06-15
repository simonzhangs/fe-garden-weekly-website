import { fetchWeeklyByLink, fetchWeeklyAllArticles } from '../../lib/data';
import ReactMarkdown from 'react-markdown';  
import remarkGfm from 'remark-gfm'; 

export async function generateStaticParams() {
  const articles = await fetchWeeklyAllArticles();
//  console.log('generateStaticParams', articles)
  return articles.map((article) => ({
    article: article.split('/weekly/')?.[1]
  }))
}

export default async function Page({ params }: { params: { article: string } }) {
  const { article } = params;
  const id = `/weekly/${article}`
  const markdownContent = await fetchWeeklyByLink(id);
  return (
    <div className='mx-4 pt-4'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown> 
    </div>
  );
}
