import { fetchWeeklyByLink } from '../../lib/data';
import ReactMarkdown from 'react-markdown';  
import remarkGfm from 'remark-gfm'; 

export default async function Page({ params }: { params: { article: string } }) {
  const { article } = params;
  console.log('article',article)
  const id = `/weekly/${article}`
    const markdownContent = await fetchWeeklyByLink(id);
  return (
    <div className='mx-4 pt-4'>
  {/* <h1>My Page: </h1> */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown> 
    </div>
  );
  
}
