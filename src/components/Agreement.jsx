import { useState, useContext, useEffect } from "react";
import { LANGUAGES } from "../constants";
import { AppContext } from "../context";
import Modal from 'react-modal';
import axios from "axios";



const Agreement = ({  value, handler  }) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [modalOpen, setModalOpen] = useState();
  const [conditions, setConditions] = useState("");
  
  useEffect(() => {
    setModalOpen(false);
    if (user) {
      var termsUrl = 'https://tip-go.ca/terms/TermsConditions-' + user.locale + '.html';
      axios.get(termsUrl).then((response) => setConditions(response.data)).catch((error) => console.log(error.message))
    }
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal(){
    setModalOpen(false);
  }

  function handleCheckbox(e) {
    //console.log('Checkbox ' + e + ' value ' + value);
    if(e == 'on') {
        if(value) {
          handler(false);
        } else {
          handler(true);
        }
    } 
  }



  return (
    
    <div>
      <fieldset>
      <legend className="sr-only">Checkbox variants</legend>
        <div className="flex items-center items-start mb-4">
            <input id="checkbox" aria-describedby="checkbox" onChange={(e) => handleCheckbox(e.target.value)} type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" checked={value === true ? 'checked':''}/>
            <label className="text-sm ml-3 font-medium text-gray-900">{LANGUAGES[state.lang].Profile.Agree} <a href="#" onClick={openModal} className="text-blue-600 hover:underline">{LANGUAGES[state.lang].Profile.TermsConditions} </a></label>
        </div>
      </fieldset>

    
      <Modal isOpen={modalOpen} ariaHideApp={false} onRequestClose={closeModal}>
          <div dangerouslySetInnerHTML={{ __html: conditions }} />
          <button onClick={closeModal} className="bg-indigo-500 cursor-pointer hover:bg-amber-500 hover:shadow-md focus:bg-amber-500 focus:shadow-md focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-md inline-block px-2 py-2 text-white font-medium uppercase rounded shadow-md transition duration-150 ease-in-out w-full">{LANGUAGES[state.lang].Close}</button>
      </Modal>
    
    </div>


  );
};

export default Agreement;
