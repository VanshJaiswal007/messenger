'use client'
/* eslint-disable */
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?:string;
    id:string;
    type?:boolean;
    required?:boolean
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
}

const MessageInput : React.FC <MessageInputProps> = ({placeholder,id,required,type,register,errors}) => {
  return (
    <div className="relative w-full">
        <input id={id} autoComplete={id} {...register(id,{required})} placeholder={placeholder}
         className="text-black font-light py-2 px-4 bg-neutral-100 rounded-full focus:outline-none"/>
    </div>
  )
}

export default MessageInput