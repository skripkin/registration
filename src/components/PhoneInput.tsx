import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputComponent: React.FC<{
  country: string;
  value: string;
  onChange: (phone: string) => void;
}> = ({ country = 'kz', value, onChange }) => {
  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      containerClass="rounded-lg shadow-none! w-full"
      inputClass="w-full! py-1  text-sm text-gray-800 placeholder:text-gray-light! rounded-lg! bg-inherit! border border-gray-light! box-content"
      buttonClass="ml-2 bg-inherit! border-none! rounded-l-lg!"
      dropdownClass="bg-white border border-gray-300 rounded-md shadow-lg"
      placeholder="+7 (123) 456 7890"
    />
  );
};

export { PhoneInputComponent as PhoneInput };
