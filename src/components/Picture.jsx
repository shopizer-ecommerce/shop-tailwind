import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context";
import { Storage } from "aws-amplify";
import { LANGUAGES } from "../constants";
import Mudations from "../api/mutations";
import { useOutletContext } from "react-router-dom";

Storage.configure({ level: 'private' });

const Picture = (handler) => {

  const { state } = useContext(AppContext);
  const { user } = state;
  const { setLoading } = useOutletContext();

  const inputFile = useRef(null);
  const [image, setImage] = useState("");

  const [file, setFile] = useState();


  useEffect(() => {
    if (user) {
      //console.log("User from DB in picture" + JSON.stringify(user));
      setImage(user?.image || "");
      const getProfilePicture = () => {
        let imgName = user.id + ".jpeg";
        //console.log('Image name ' + imgName);
        Storage.get(imgName)
          .then(url => {
            var myRequest = new Request(url);
            fetch(myRequest).then(function(response) {
              if (response.status === 200) {
                //console.log('Image Url ' + url);
                setImage(url);
              }
            });
          })
          .catch(err => console.log(err));
      };
      getProfilePicture();
    }
  }, [user]);


  function picture(e) {
    handler(e);
  }

  function handleChange(event) {
    
   // e.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    setFile(event.target.files[0])
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
    reader.onloadend = () => {
      setImage(reader.result);
    };
    //console.log('Image has been sent ' + image);
    let image = user.id + ".jpeg";

    Storage.put(user.id + ".jpeg", file, {
      level: "private",
      contentType: "image/jpeg"
    })
      .then(result => console.log('Success ' + result))
      .catch(err => console.log(err));
;

  }


  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (



    <div className="profilePictureArea">
      <label className="block text-sm font-medium text-gray-700 profilePictureLabel">
      {LANGUAGES[state.lang].Profile.Picture}
      </label>

      <div className="mt-1 flex items-center">
      <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
      {image === null && (
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      {image != null && (
        <img src={image} alt=""/>
      )}
      </span>

      <input type="file" onChange={handleChange} ref={inputFile} style={{ display: 'none' }} />
      <button type="button" onClick={onButtonClick} className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {LANGUAGES[user.locale].Change}
      </button>

      </div>
    </div>

  );
};


export default Picture;