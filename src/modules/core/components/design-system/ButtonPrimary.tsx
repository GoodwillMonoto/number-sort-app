import { FaSort } from 'react-icons/fa'

type Props = {
    text : string;
    onClick: () => void;
    disabled?: boolean;

}

export default function ButtonPrimary({text,disabled,onClick}: Props) {
  return (
    
    <button 
      className="absolute right-2 flex  pl-2 pr-2 flex-row  items-center bg-red-400 text-white rounded-full  cursor-pointer "
      onClick={onClick}
      disabled={disabled}
      
    >  
      <FaSort size={25} 
      /> 
      {text}  
    </button>
  )
}
