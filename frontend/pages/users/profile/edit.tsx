import router from "next/router";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useProfile } from "../../../hooks/useProfile";

export default function JobSeekerProfileEdit() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const { currentUser } = useCurrentUser();
  const { setCurrentUser } = useAuthentication();

  const { updateProfile } = useProfile();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, nickname, introduction });
    // TODO: ここ無理やりすぎ。currentUserはSWRで更新させた方が良さそう。
    setCurrentUser({
      ...currentUser,
      profile: { name, nickname, introduction },
    });
    alert("更新しました");
    router.push(`/users/${name}`);
  };

  useEffect(() => {
    setIntroduction(currentUser?.profile.introduction);
    setName(currentUser?.profile.name);
    setNickname(currentUser?.profile.nickname);
  }, [currentUser]);
  return (
    <>
      <div className="container mx-auto pt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              本名
              <input
                type="text"
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              ニックネーム
              <input
                type="text"
                className="border-gray-400 w-full border pl-2 pr-2 h-10 rounded-md"
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              自己紹介
              <textarea
                className="w-full border pl-2 pr-2 border-gray-400 rounded-md"
                rows="5"
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            className="py-2 px-6 border border-yellow-500 rounded-3xl bg-yellow-500 text-white"
          >
            保存する
          </button>
        </form>
      </div>
    </>
  );
}
