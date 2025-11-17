// import { useState, ChangeEvent } from "react";

// const defaultImage = "/public/default-image.jpg";

// const UploadPhoto = () => {
//   const [preview, setPreview] = useState<string | null>(null);

//   const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];

//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setPreview(defaultImage);
//     }
//   };

//   return (
//     <form>
//       <input
//         type="file"
//         id="dishPhoto"
//         accept="image/*"
//         onChange={onFileChange}
//       />
//       {preview && (
//         <img
//           src={preview}
//           alt="preview"
//           style={{ maxWidth: "300px", maxHeight: "300px", marginTop: "10px" }}
//         />
//       )}
//     </form>
//   );
// };

// export default UploadPhoto;
