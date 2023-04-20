import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context";
import { LANGUAGES } from "../constants";
import { useOutletContext } from "react-router-dom";
import { Buffer } from 'buffer';
import axios from 'axios'


const ProductImage = ({ image, name, className }) => {

  const { state } = useContext(AppContext);
  const { setLoading } = useOutletContext();
  const [ renderedImage, setRenderedImage ] = useState("");
  const [ imageUrl, setImageUrl ] = useState("");

  /**
   * 
   * @param {*} image 
   * @returns 
   * 
   * TODO bucket
   * TODO api url
   */




    //build image url
   useEffect(() => {

      var urlObj = new URL(image);
      var imageKey = urlObj.href.replace(urlObj.origin, '').substring(1);
      
      //console.log('Image Key ' + returnImage);

      const imagePayload = JSON.stringify(
        {
          bucket: 'shopizer-demo-bucket',
          key: imageKey,
          edits: {
              resize: {
                width: 300,
                height: 300,
                fit: 'cover'
              }
          }
      });

      const headerConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
      };

      /** TODO URL */
      setImageUrl('https://d1jarr45y981ou.cloudfront.net/' + btoa(imagePayload),headerConfig);

    
  }, []);



  return (

    <img
    src={imageUrl}
    alt={name}
    className={className}
    />



  );
};


export default ProductImage;