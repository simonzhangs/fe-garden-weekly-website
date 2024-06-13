import { fetchLatestWeekly } from '../lib/data';
import ReactMarkdown from 'react-markdown';  
import remarkGfm from 'remark-gfm'; 

export default async function Page() {
    const markdownContent = await fetchLatestWeekly();
  return (
    <div className='mx-4 pt-4'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown> 
    </div>
  );
}
