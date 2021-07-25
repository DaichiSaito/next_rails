import { useState } from "react";
import useSWR from "swr";
import { usePortfolios } from "../../hooks/usePortfolios";
import fetcher from "../../lib/util/fetcher";
import { WithContext as ReactTags } from "react-tag-input";
export default function PortfolioNew() {
  const [title, setTitle] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [publishedOn, setPublishedOn] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const { create } = usePortfolios();
  const { data, error } = useSWR("http://localhost:5000/tags", fetcher);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await create({
      title,
      serviceUrl,
      publishedOn,
      githubUrl,
      body,
      tags,
    });
    alert("作ったよ");
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  if (data === undefined) return <>読み込み中</>;
  const suggestions = data.tags.map((tag) => {
    return {
      id: String(tag.id),
      name: tag.name,
    };
  });
  // const { tags: suggestions } = data;
  console.log(suggestions);

  return (
    <>
      <div className="container mx-auto pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              タイトル
              <input
                type="text"
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              サービス
              <input
                type="text"
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                onChange={(e) => setServiceUrl(e.target.value)}
                value={serviceUrl}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              公開日
              <input
                type="date"
                className="w-full h-10 border pl-2 pr-2 border-gray-400 rounded-md"
                onChange={(e) => setPublishedOn(e.target.value)}
                value={publishedOn}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              GitHubリポジトリ
              <input
                type="text"
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                onChange={(e) => setGithubUrl(e.target.value)}
                value={githubUrl}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              サービス紹介
              <textarea
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                rows="5"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
          </div>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            labelField={"name"}
            classNames={{
              tag: "bg-blue-100 text-indigo-700 inline-block py-1 px-5 m-1 rounded-md",
              tagInputField:
                "border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md",
              suggestions:
                "bg-blue-100 text-indigo-700 inline-block py-1 px-5 m-1 rounded-md",
            }}
          />

          <button
            type="submit"
            className="py-2 px-6 border border-yellow-500 rounded-3xl bg-yellow-500 text-white mt-5"
          >
            登録する
          </button>
        </form>
      </div>
    </>
  );
}
