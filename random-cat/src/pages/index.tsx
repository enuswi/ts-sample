import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface IndexPageProps {
  initialCatImageUrl: string;
}

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: String[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = (await res.json()) as SearchCatImageResponse;
  return result[0];
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  }
  return (
    <div>
      <button onClick={handleClick}>今日のニャンコ</button>
      <div>
        <img src={catImageUrl} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
}

export default IndexPage;