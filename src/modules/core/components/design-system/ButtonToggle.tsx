import { FaToggleOff,FaToggleOn } from "react-icons/fa";
type Props = {
    toggleText: [string, string];
    isOn: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export default function ButtonToggle({toggleText,isOn, disabled, onClick}: Props) {
  return (
    <div className="flex flex-col  space-x-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex items-center justify-center"
      >
          {isOn ? 
          (<FaToggleOn size={24} className="text-green-500 " />  ) : 
          ( <FaToggleOff size={24} className="text-red-500" />  )}
      </button>    
      
      <div className="text-sm overflow-hidden text-gray-700">
        {isOn ? toggleText[0] : toggleText[1]}
      </div>
      
    </div>

  )
}
