import Mock from "mockjs";

const songs = Mock.mock({
  "list|15": [
    {
      "id|+1": 1,
      name: "@cword(2, 5)",
      author: "@cname",
      popularity: "@integer(0, 100000)",
      date: "@date",
    },
  ],
});
Mock.mock("http://getMock/songs", "get", songs);

const songList = Mock.mock({
  "list|5": [
    {
      "id|+1": 1,
      name: "@cword(2, 5)",
      sum: "@integer(0, 1000)",
      isCollect: "@boolean",
      date: "@date",
    },
  ],
});


Mock.mock("http://getMock/songList", "get", () => {
  return songList;
});

