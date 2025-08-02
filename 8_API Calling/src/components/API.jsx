import React, { useState, useEffect } from "react";
import Select from "react-select";

function API() {
  const [dogBreed, setDogBreed] = useState([]);
  const [dogImg, setDogImg] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        const list = [];
        Object.entries(data.message).forEach((entrie) => {
          if (entrie[1].length > 0) {
            entrie[1].forEach((innerEnterie) => {
              list.push({
                value: `${entrie[0]}/${innerEnterie}`,
                label: `${entrie[0]} ${innerEnterie}`,
              });
            });
          } else {
            list.push({
              value: entrie[0],
              label: entrie[0],
            });
          }
        });
        setDogBreed(list);
      });
  }, []);

  const handleSelectChange = (e) => {
    fetch(`https://dog.ceo/api/breed/${e.value}/images/random`)
      .then((response) => response.json())
      .then((data) => {
        setDogImg(data.message);
      })
      .catch((error) => {
        console.error("Error fetching dog image:", error);
      });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "32px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px rgba(60, 60, 120, 0.15)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "24px", color: "#4f46e5", fontWeight: 700 }}>
        Dog Breed Selector
      </h2>
      <Select
        options={dogBreed}
        onChange={handleSelectChange}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "10px",
            borderColor: "#6366f1",
            boxShadow: "none",
            fontSize: "1rem",
          }),
        }}
        placeholder="Choose a breed..."
      />

      {dogImg && (
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              border: "6px solid #6366f1",
              borderRadius: "16px",
              padding: "12px",
              background: "#fff",
              boxShadow: "0 4px 16px rgba(99, 102, 241, 0.12)",
              display: "inline-block",
            }}
          >
            <img
              src={dogImg}
              alt="Dog"
              style={{
                width: "320px",
                height: "auto",
                borderRadius: "10px",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default API;



// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// function API() {
//   const [dogBreed, setDogBreed] = useState([]);
//   const [dogImgs, setDogImgs] = useState([]);

//   useEffect(() => {
//     fetch("https://dog.ceo/api/breeds/list/all")
//       .then((response) => response.json())
//       .then((data) => {
//         const list = [];
//         Object.entries(data.message).forEach((entrie) => {
//           if (entrie[1].length > 0) {
//             entrie[1].forEach((innerEnterie) => {
//               list.push({
//                 value: `${entrie[0]}/${innerEnterie}`,
//                 label: `${entrie[0]} ${innerEnterie}`,
//               });
//             });
//           } else {
//             list.push({
//               value: entrie[0],
//               label: entrie[0],
//             });
//           }
//         });
//         setDogBreed(list);
//       });
//   }, []);

//   const handleSelectChange = (e) => {
//     fetch(`https://dog.ceo/api/breed/${e.value}/images`)
//       .then((response) => response.json())
//       .then((data) => {
//         setDogImgs(data.message);
//       })
//       .catch((error) => {
//         console.error("Error fetching dog images:", error);
//       });
//   };

//   return (
//     <>
//       <Select options={dogBreed} onChange={handleSelectChange} />

//       <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
//         {dogImgs.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt="Dog"
//             style={{ width: "200px", height: "auto", margin: "10px" }}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default API;




// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";

// function API() {
//   const [dogBreed, setDogBreed] = useState([]);
//   const [dogImg, setDogImg] = useState("");

//   useEffect(() => {
//     axios
//       .get("https://dog.ceo/api/breeds/list/all")
//       .then((response) => {
//         const list = [];
//         Object.entries(response.data.message).forEach((entrie) => {
//           if (entrie[1].length > 0) {
//             entrie[1].forEach((innerEnterie) => {
//               list.push({
//                 value: `${entrie[0]}/${innerEnterie}`,
//                 label: `${entrie[0]} ${innerEnterie}`,
//               });
//             });
//           } else {
//             list.push({
//               value: entrie[0],
//               label: entrie[0],
//             });
//           }
//         });
//         setDogBreed(list);
//       })
//       .catch((error) => {
//         console.error("Error fetching dog breeds:", error);
//       });
//   }, []);

//   const handleSelectChange = (e) => {
//     axios
//       .get(`https://dog.ceo/api/breed/${e.value}/images/random`)
//       .then((response) => {
//         setDogImg(response.data.message);
//       })
//       .catch((error) => {
//         console.error("Error fetching dog image:", error);
//       });
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "40px auto",
//         padding: "32px",
//         background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
//         borderRadius: "18px",
//         boxShadow: "0 8px 32px rgba(60, 60, 120, 0.15)",
//         textAlign: "center",
//       }}
//     >
//       <h2 style={{ marginBottom: "24px", color: "#4f46e5", fontWeight: 700 }}>
//         Dog Breed Selector
//       </h2>
//       <Select
//         options={dogBreed}
//         onChange={handleSelectChange}
//         styles={{
//           control: (base) => ({
//             ...base,
//             borderRadius: "10px",
//             borderColor: "#6366f1",
//             boxShadow: "none",
//             fontSize: "1rem",
//           }),
//         }}
//         placeholder="Choose a breed..."
//       />

//       {dogImg && (
//         <div
//           style={{
//             marginTop: "32px",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               border: "6px solid #6366f1",
//               borderRadius: "16px",
//               padding: "12px",
//               background: "#fff",
//               boxShadow: "0 4px 16px rgba(99, 102, 241, 0.12)",
//               display: "inline-block",
//             }}
//           >
//             <img
//               src={dogImg}
//               alt="Dog"
//               style={{
//                 width: "320px",
//                 height: "auto",
//                 borderRadius: "10px",
//                 display: "block",
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default API;
