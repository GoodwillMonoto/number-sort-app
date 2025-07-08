import { FaSort } from 'react-icons/fa'

type Props = {
    text : string;
    onClick: () => void;
    disabled?: boolean;

}

export default function ButtonPrimary({text,disabled,onClick}: Props) {
  return (
    
    <button
      onClick={onClick}
      disabled={disabled}
      
    >  
    <div className="flex flex-row items-center bg-red-400 text-white rounded-full pr-2 cursor-pointer mx-2" >  
      <FaSort size={34} 
      
      /> 
      {text}  
    </div>  
    </button>
  )
}
