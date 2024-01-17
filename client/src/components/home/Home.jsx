import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  // const [showName, setShowName] = useState("");
  const myData = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (myData.name && myData.email) {
  //     setShowName(myData.name);
  //   }
  // }, [myData, showName]);

  // console.log(myData);
  return (
    <div>
      <h1>
        Hi,
        {myData &&
          myData?.name &&
          myData?.name[0].toUpperCase() + myData?.name?.substring(1)}
      </h1>
      <hr />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
      recusandae! Omnis alias at itaque saepe obcaecati deleniti voluptate iure
      fugit reprehenderit! Nemo aspernatur pariatur nam doloremque deserunt
      necessitatibus obcaecati non neque velit! Architecto quibusdam, soluta
      magni, itaque dignissimos molestias, error aut molestiae optio nostrum
      aspernatur! Adipisci quidem, voluptates sed harum eum atque, sunt quasi,
      tempore consequuntur hic architecto labore aspernatur! Voluptatem
      praesentium consequuntur, alias quibusdam, quia doloribus minima ut
      tempora harum iure, dolor incidunt dignissimos. Quod doloremque repellat
      deleniti, saepe quasi est atque, velit, fugiat explicabo consequuntur
      reprehenderit nulla fugit. Consectetur excepturi ducimus consequatur unde
      quisquam similique corrupti? Officiis totam excepturi esse dolores
      provident minus exercitationem numquam, qui, officia harum, explicabo cum.
      Temporibus velit iste nemo unde inventore, exercitationem aliquid
      explicabo porro amet beatae voluptas, dolor, natus corporis earum.
      Necessitatibus esse tempore sunt adipisci, porro ab, vitae ratione
      officia, sint veniam accusantium saepe corporis nisi? Saepe maiores
      assumenda iure. Non officiis autem, quos dolorem cum dignissimos vitae
      enim sed delectus praesentium, vero nemo. Impedit perferendis
      exercitationem odio ipsum cupiditate esse temporibus autem quia
      dignissimos. A, debitis nesciunt? Cupiditate quas aperiam sequi fuga
      aspernatur odit tempora itaque quae! Earum quaerat quasi corrupti. Tempora
      maxime veritatis aliquam tempore, autem atque beatae harum.
    </div>
  );
};

export default Home;
