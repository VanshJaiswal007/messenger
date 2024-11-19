// 'use client'

// import useConversation from "@/app/hooks/useConversation"
// import axios from "axios";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
// import MessageInput from "./MessageInput";
// import {CldUploadButton} from 'next-cloudinary'

// const Form = () => {

//   const {conversationId} = useConversation();

//   const {register,handleSubmit,setValue,formState:{errors}} = useForm<FieldValues>({
//     defaultValues:{
//         message: ''
//     }
//   })

//   const onSubmit: SubmitHandler<FieldValues> = (data) =>{
//     setValue('message','',{shouldValidate:true});
//      axios.post('/api/messages', {
//         ...data,
//         conversationId
//      })
//   }

//   const handleUpload = (result: any) => {
//     console.log(result);
//     if (result?.info?.secure_url) {
//         console.log("i am called")
//       axios.post('/api/messages', {
//         image: result.info.secure_url,
//         conversationId,
//       })
//       .then(response => console.log("Image uploaded successfully", response))
//       .catch(err => console.error("Error uploading image to server:", err));
//     } else {
//       console.error("Upload failed:", result);
//     }
//   };

//   return (
//     <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
//         <CldUploadButton options={{maxFiles:1}} onUpload={(result)=>{console.log("upload started"); handleUpload(result)}} uploadPreset="v0wohadc">
//         <HiPhoto size={30} className="text-sky-500"/>
//         </CldUploadButton>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
//                 <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
//         <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-slate-600 transition"> 
//             <HiPaperAirplane size={18} className="text-white"/>
//         </button>
//         </form>
//     </div>
//   )
// }

// export default Form;

'use client';

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from 'next-cloudinary';


/* eslint-disable */
const Form = () => {
  const { conversationId } = useConversation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId
    });
  };

  const handleUploadSuccess = (result: any) => {
    console.log(result);
    if (result?.info?.secure_url) {
      console.log("Image upload successful");
      axios.post('/api/messages', {
        image: result.info.secure_url,
        conversationId,
      })
        .then(response => console.log("Image uploaded successfully", response))
        .catch(err => console.error("Error uploading image to server:", err));
    }
  };

  const handleUploadError = (error: any) => {
    console.error("Upload failed:", error);
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton 
        options={{ maxFiles: 1 }} 
        uploadPreset="v0wohadc"
        onSuccess={handleUploadSuccess} // use onSuccess instead of onUpload
        onError={handleUploadError} // use onError for handling errors
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-slate-600 transition"> 
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default Form;
