import React, { useEffect, useState } from "react";
import "../../mock/Mock";
import api from "../../api/http";
import SongTable from "../../component/SongTable";

export default function Songs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("http://getMock/songs").then((res) => {
      setData(res.data.list);
    });

  }, []);

  return (
    <div>
      <SongTable data={data} />
    </div>
  );
}
