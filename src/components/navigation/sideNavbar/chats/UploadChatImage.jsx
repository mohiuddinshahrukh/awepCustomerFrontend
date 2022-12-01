// import React from 'react'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
// import storage from '../FB'
// import { IconAdjustments } from '@tabler/icons'

// import { showNotification } from '@mantine/notifications'

// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
// import {
//   ActionIcon,
//   Button,
//   FileInput,
//   Grid,
//   Group,
//   Image,
//   Input,
//   Paper,
//   Progress,
//   SimpleGrid,
//   Text,
// } from '@mantine/core'
// import { ArrowLeft, ArrowRight, Upload } from 'tabler-icons-react'
// import { width } from '@mui/system'
// import { Camera } from 'tabler-icons-react'

// const UploadChatImages = (props) => {
//   const randomNum = Math.random(999999) * 10000

//   const [refresh, setRefresh] = useState(false)
//   React.useEffect(() => {
//     if (refresh) {
//       setRefresh(false)
//     }
//   }, [refresh])
//   console.log('imageUrls are ', props.imageURLS)

//   console.log('urls are', props.urls)

//   console.log('urls2 are', props.urls2)

//   React.useEffect(() => {
//     console.log('ACHA JEE')
//     if (props.disabled1) {
//       props.setDisabled(true)
//       console.log('ACHA JEE 2')
//       let enable = true
//       for (let i = 0; i < props.images.length; i++) {
//         if (props.percentages[i] !== 100) {
//           enable = false
//         }
//       }
//       if (enable) {
//         props.setIndexOfCoverImageURL(0)
//         props.setDisabled(false)
//         props.setDisabled1(false)
//       }
//     }
//   }, [props.percentages, props.urls, props.images])

//   const handleUpload = (images, prevLength = 0) => {
//     props.setError('')
//     // props.setPercentages([]);
//     props.setDisabled1(true)
//     // props.setDisabled2(true);
//     // if (images.length <= 0) {
//     //   alert("Please choose a file first!");
//     // }
//     var percent = 0
//     for (
//       let indexOfNewImage = 0;
//       indexOfNewImage < images.length;
//       indexOfNewImage++
//     ) {
//       const image = images[indexOfNewImage]
//       // alert("IN2");
//       const storageRef = ref(
//         storage,
//         `/${props.folder}/${image.name}@_@${randomNum}`,
//       )
//       const uploadTask = uploadBytesResumable(storageRef, image)
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           console.log(snapshot)
//           percent = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//           )
//           let Percentages = props.percentages
//           Percentages[indexOfNewImage + prevLength] = percent
//           props.setPercentages(Percentages)
//           console.log(Percentages)
//           setRefresh(!refresh)
//         },
//         (err) => console.log(err),
//         () => {
//           // download url

//           //   alert(Percentages)
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             let Percentages = props.percentages
//             Percentages[indexOfNewImage + prevLength] = 100
//             props.setPercentages(Percentages)
//             console.log('@TEST', indexOfNewImage + prevLength)
//             props.setImageURLS([url])

//             props.setUrls([url])

//             setRefresh(!refresh)
//             // props.setDisabled2(false);

//             props.setHidden(false)
//             props.setError('')
//           })
//         },
//       )
//     }
//     // alert("OUT");
//   }

//   return (
//     <Dropzone
//       m={5}
//       p={0}
//       styles={{
//         root: {
//           maxHeight: '30px',
//           maxWidth: '30px',
//         },
//       }}
//       maxFiles={1}
//       multiple={false}
//       radius={200}
//       maxSize={3 * 1024 ** 2}
//       accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.svg, MIME_TYPES.gif]}
//       onReject={(file) => {
//         showNotification({
//           color: 'red',
//           title: `ERROR`,

//           message: `THIS FILE TYPE IS NOT SUPPORTED`,
//         })
//       }}
//       activateOnDrag={false}
//       onDrop={(newImages) => {
//         let newFilteredImages = []
//         let showDuplicateAlert = false

//         newImages?.map((newImage) => {
//           let addImage = true
//           props.images?.map((image) => {
//             console.log('@COMPARE', newImage.path, image.path)
//             console.log('@@OLD', image)
//             console.log('@@New', newImage)
//             if (newImage.path == image.path) {
//               showDuplicateAlert = true

//               addImage = false
//             }
//           })
//           if (addImage) {
//             newFilteredImages.push(newImage)
//           }
//         })
//         if (showDuplicateAlert) {
//           showNotification({
//             color: 'yellow',
//             title: `IT'S ALREADY THERE!!`,

//             message: `DUPLICATE IMAGES HAVE NOT BEEN ADDED`,
//           })
//         }
//         const prevLength = props.images.length

//         props.setImages((prevImages) => [...prevImages, ...newFilteredImages])
//         handleUpload(newFilteredImages, prevLength)
//       }}
//       style={{
//         height: '150px',
//         backgroundColor: '#E0E0E0',
//       }}
//     >
//       <Camera />
//     </Dropzone>
//   )
// }

// export default UploadChatImages

import React from "react";
import { Avatar, Button, Progress } from "@mantine/core";
// import storage from "../FB";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showNotification } from "@mantine/notifications";
import { IconCamera } from "@tabler/icons";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
// import { Camera } from "tabler-icons-react";

const UploadCoverImage = (props) => {
  // const previews = props.images?.map((file, index) => {
  //   const imageUrl = URL.createObjectURL(file)
  //   return (
  //     <div>
  //       <Avatar
  //         key={index}
  //         src={imageUrl}
  //         size={140}
  //         radius={120}
  //         mx="auto"
  //         imageProps={{
  //           onLoad: () => URL.revokeObjectURL(imageUrl),
  //         }}
  //       />
  //       <Progress
  //         animate={props.percentages[index] === 100 ? false : true}
  //         value={props.percentages[index] === 100 ? 100 : 100}
  //         label={props.percentages[index] === 100 && '100% Completed'}
  //         size="xl"
  //         radius="xl"
  //         color={props.percentages[index] === 100 ? 'green' : 'gray'}
  //       />
  //     </div>
  //   )
  // })

  const handleUpload = (images) => {
    props.setError("");
    props.setPercentages([]);
    props.setDisabled(true);
    // props.setDisabled3(true)
    // props.setDisabled2(true)
    if (images.length <= 0) {
      alert("Please choose a file first!");
    }
    var percent = 0;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // alert("IN2");
      const storageRef = ref(
        getStorage,
        `/${props.folderName}/${image.name}+${Math.random(999999)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);

      props.setUploadTask(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          props.setPercentage(percent);
        },
        (err) => console.log(err),
        () => {
          let Percentages = props.percentages;
          Percentages[i] = percent;
          console.log(Percentages);
          props.setPercentages(Percentages);
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            props.setUrls(url);
            // props.setRefresh(!props.refresh);
            // props.setDisabled(false)
            // props.setDisabled3(false)
            // props.setDisabled2(false)
            props.setError("");
          });
        }
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Dropzone
        m={5}
        p={0}
        styles={{
          root: {
            maxHeight: "30px",
            maxWidth: "30px",
          },
        }}
        onReject={(file) => {
          showNotification({
            color: "red",
            title: `COULD NOT UPLOAD`,

            message: `IMAGE SIZE IS TOO LARGE OR THIS FILE TYPE IS NOT SUPPORTED`,
          });
        }}
        // radius={120}
        onDrop={(newImages) => {
          let newFilteredImages = [];
          newImages?.map((newImage) => {
            let addImage = true;
            props.images?.map((image) => {
              console.log("@COMPARE", newImage.path, image.path);
              console.log("@@OLD", image);
              console.log("@@New", newImage);
              if (newImage.path == image.path) {
                addImage = false;
                showNotification({
                  color: "yellow",
                  title: `IT'S ALREADY THERE!!`,

                  message: `THIS IMAGE IS ALREADY UPLOADED`,
                });
              }
            });
            if (addImage) {
              newFilteredImages.push(newImage);
              props.setImages(newFilteredImages);

              handleUpload(newFilteredImages);
            }
          });
        }}
        maxSize={3 * 1024 ** 3}
        disabled={props.disabled}
        maxFiles={1}
        multiple={false}
        accept={[
          MIME_TYPES.jpeg,
          MIME_TYPES.png,
          MIME_TYPES.svg,
          MIME_TYPES.gif,
        ]}
      >
        <IconCamera />
        {/* {previews} */}
      </Dropzone>
    </div>
  );
};

export default UploadCoverImage;
