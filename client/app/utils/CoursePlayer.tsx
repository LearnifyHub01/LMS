// // import axios from "axios";
// // import Image from "next/image";
// // import React, { FC, useEffect, useState } from "react";
// // type Props = {
// //   videoUrl: any;
// //   title: any;
// //   thumnail:any
// // };
// // const CoursePlayer: FC<Props> = ({ videoUrl,thumnail,title }) => {
// //   const [videoData, setVideoData] = useState({
// //     otp: "",
// //     playbackInfo: "",
// //     videoWidth:
// //   });

// //   useEffect(() => {
// //     axios
// //       .post('http://localhost:8080/api/v1/getVdoCipherOTP', {
// //         videoId: videoUrl,
// //       })
// //       .then((res) => {
// //         setVideoData(res.data);
// //       });
// //   }, [videoUrl]);
// //   console.log(videoData)
  
// //   return (
// // <div style={{ paddingTop: "41%", position: "relative"}}>
  
// //   {videoData.otp && videoData.playbackInfo !== "" && (
// //     <iframe
// //       src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=ONFjnbL6VuK4NhOQ`}
// //       style={{
// //         border: 0,
// //         width: "90%",
// //         height: "100%",
// //         position: "absolute",
// //         top: 0,
// //         right: 0,
// //       }}
// //       allowFullScreen={true}
// //       allow="encrypted-media"
// //     ></iframe>
// //   )}
// // </div>

// //   );
// // };

// // export default CoursePlayer;
// import axios from "axios";
// import Image from "next/image";
// import React, { FC, useEffect, useState } from "react";

// type Props = {
//   videoUrl: any;
//   title: any;
//   //thumnail: any;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, thumnail, title }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//     videoWidth: 800, 
//     videoHeight: 360, 
//   });

//   useEffect(() => {
//     axios
//       .post("http://localhost:8080/api/v1/getVdoCipherOTP", {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         const { otp, playbackInfo } = res.data;
//         console.log(otp,playbackInfo)

//         let videoWidth = 800;
//         let videoHeight = 360;

//         try {
//           const playbackInfoDecoded = JSON.parse(atob(playbackInfo));
//           videoWidth = playbackInfoDecoded.width || videoWidth;
//           videoHeight = playbackInfoDecoded.height || videoHeight;
//         } catch (error) {
//           console.error("Error decoding playbackInfo:", error);
//         }

//         setVideoData({ otp, playbackInfo, videoWidth, videoHeight });
//       });
//   }, [videoUrl]);

//   console.log(videoData);

//   return (
//     <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
//       {videoData.otp && videoData.playbackInfo !== "" ? (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=ONFjnbL6VuK4NhOQ`}
//           style={{
//             border: 0,
//             width: `${videoData.videoWidth}px`,
//             height: `${videoData.videoHeight}px`,
//             maxWidth: "100%",
//             aspectRatio: `${videoData.videoWidth}/${videoData.videoHeight}`,
//             borderRadius: "8px",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//           }}
//           allowFullScreen
//           allow="encrypted-media"
//         ></iframe>
//       ) : (
//         // <Image
//         //   src={thumnail || null}
//         //   alt="Video Thumbnail"
//         //   width={640}
//         //   height={360}
//         //   className="rounded-lg shadow-lg"
//         // />
//         null
        
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;


// import axios from "axios";
// import React, { FC, useEffect, useState } from "react";

// type Props = {
//   videoUrl: any;
//   title: any;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//     videoWidth: 800,
//     videoHeight: 450,
//   });

//   useEffect(() => {
//     axios
//       .post("http://localhost:8080/api/v1/getVdoCipherOTP", {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         const { otp, playbackInfo } = res.data;
//         let videoWidth = 800;
//         let videoHeight = 450;

//         try {
//           const playbackInfoDecoded = JSON.parse(atob(playbackInfo));
//           videoWidth = playbackInfoDecoded.width || videoWidth;
//           videoHeight = playbackInfoDecoded.height || videoHeight;
//         } catch (error) {
//           console.error("Error decoding playbackInfo:", error);
//         }

//         setVideoData({ otp, playbackInfo, videoWidth, videoHeight });
//       })
//       .catch((error) => {
//         console.error("Error fetching video data:", error);
//       });
//   }, [videoUrl]);

//   return (
//     <div className="w-full relative" style={{ aspectRatio: "16/9" }}>
//       {videoData.otp && videoData.playbackInfo !== "" ? (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=ONFjnbL6VuK4NhOQ`}
//           className="w-full h-full rounded-lg shadow-lg"
//           style={{
//             border: 0,
//             position: "absolute",
//             top: 0,
//             left: 0,
//             aspectRatio: `${videoData.videoWidth}/${videoData.videoHeight}`,
//           }}
//           allowFullScreen
//           allow="encrypted-media"
//           title={title}
//         />
//       ) : (
//         <div
//           className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg shadow-lg"
//           style={{ aspectRatio: "16/9" }}
//         >
//           <span className="text-gray-600 text-sm md:text-lg">
//             Loading video...
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;

// import axios from "axios";
// import React, { FC, useEffect, useState } from "react";

// type Props = {
//   videoUrl: any;
//   title: any;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
//   const [videoData, setVideoData] = useState({
//     otp: "",
//     playbackInfo: "",
//     videoWidth: 800,
//     videoHeight: 450,
//   });

//   useEffect(() => {
//     axios
//       .post("http://localhost:8080/api/v1/getVdoCipherOTP", {
//         videoId: videoUrl,
//       })
//       .then((res) => {
//         const { otp, playbackInfo } = res.data;
//         let videoWidth = 800;
//         let videoHeight = 450;

//         try {
//           const playbackInfoDecoded = JSON.parse(atob(playbackInfo));
//           videoWidth = playbackInfoDecoded.width || videoWidth;
//           videoHeight = playbackInfoDecoded.height || videoHeight;
//         } catch (error) {
//           console.error("Error decoding playbackInfo:", error);
//         }

//         setVideoData({ otp, playbackInfo, videoWidth, videoHeight });
//       })
//       .catch((error) => {
//         console.error("Error fetching video data:", error);
//       });
//   }, [videoUrl]);

//   return (
//     <div className="w-full relative">
//       {videoData.otp && videoData.playbackInfo !== "" ? (
//         <iframe
//           src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=ONFjnbL6VuK4NhOQ`}
//           className="w-full rounded-lg shadow-lg"
//           style={{
//             border: 0,
//             height: "100%",
//             minHeight: "400px",
//           }}
//           allowFullScreen
//           allow="encrypted-media"
//           title={title}
//         />
//       ) : (
//         <div className="w-full flex items-center justify-center bg-gray-100 rounded-lg shadow-lg min-h-[400px]">
//           <span className="text-gray-600 text-sm md:text-lg">
//             Loading video...
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursePlayer;

import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: any;
  title: any;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
    videoWidth: 800,
    videoHeight: 450,
  });

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        const { otp, playbackInfo } = res.data;
        let videoWidth = 800;
        let videoHeight = 450;

        try {
          const playbackInfoDecoded = JSON.parse(atob(playbackInfo));
          videoWidth = playbackInfoDecoded.width || videoWidth;
          videoHeight = playbackInfoDecoded.height || videoHeight;
        } catch (error) {
          console.error("Error decoding playbackInfo:", error);
        }

        setVideoData({ otp, playbackInfo, videoWidth, videoHeight });
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [videoUrl]);

  return (
    <div className="w-full aspect-video relative">
      {videoData.otp && videoData.playbackInfo ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=ONFjnbL6VuK4NhOQ`}
          className="w-full h-full rounded-md"
          allowFullScreen
          allow="encrypted-media"
          title={title}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-600 text-base">Loading video...</span>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;