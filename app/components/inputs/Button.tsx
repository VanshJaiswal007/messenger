'use client'

import clsx from "clsx"

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined ;
    fullwidth? : boolean;
    children ? : React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?:boolean;
    disabled?:boolean;
}

const Button : React.FC <ButtonProps> = ({
    type,fullwidth,children,onClick,secondary,danger,disabled
}) => {
  return (
     <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(`
              flex
              justify-center
              rounded-md
              py-3
              text-sm
              font-semibold
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
            `,disabled && `opacity-50 cursor-default`,fullwidth && `w-full` , secondary ? `text-gray-900`:`text-white`,danger && `bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600`,
        !secondary && !danger && `bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 pl-2 pr-2`)
        }
     >
        {children}
     </button>
     
  )
}

export default Button