export default function Page({ params }: { params: { article: string } }) {
  const { article } = params;

  return <h1>My Page: {article}</h1>;
}
