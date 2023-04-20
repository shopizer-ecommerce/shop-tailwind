import { customAlphabet } from 'nanoid'

const ShortId = () => {
    return  customAlphabet('1234567890abcdef', 6)
};
  
export default ShortId;
  