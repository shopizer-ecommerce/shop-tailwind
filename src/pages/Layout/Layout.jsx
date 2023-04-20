import { useEffect, useState, useContext, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { ROUTES, TYPES } from "../../constants";
import { Loading, Nav } from "../../components";
import { DummyHeader, Header, Footer } from "../../sections";
import axios from 'axios'

export default function Layout() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  /**  Header contains category and cart */

  //category
  const loadCategories = async () => {

    //console.log('Get category ' + process.env.SERVER_HOST);
    setLoading(true);
    const categoryUrl = process.env.REACT_APP_SERVER_HOST + '/v1/category?store=DEFAULT';

    axios ({
        method: "GET",
        url: categoryUrl
    }).then((response) => {
        const data = response.data;
        setCategories(data.categories);
        dispatch({ type: TYPES.UPDATE_CATEGORIES, payload: data.categories });
        setLoading(false);
        
    }).catch((error) => {
        console.log(JSON.stringify(error));
    })
  };

   //cart


  const loadHeader = useCallback(async ({}) => {
    if (!state.categories) {
      //console.log('No categories');
      //let user = await Queries.GetUserByEmail(email);
      //if (!user) user = await Mutations.CreateUser(email, locale);
      //dispatch({ type: TYPES.UPDATE_CATEGORIES, payload: user });
    }
  }, []);


  /**
  const handleSignOut = async () => {
    await Auth.SignOut();
    dispatch({ type: TYPES.UPDATE_LANG, payload: state.user.locale });
    dispatch({ type: TYPES.UPDATE_USER, payload: null });
    navigate(ROUTES[state.lang].SIGN_IN);
  };
  **/

  useEffect(() => {


    /**
    const loadHeader = async () => {
      try {


        const attributes = await Auth.GetUser();
        await loadUser({
          email: attributes.email,
          locale: attributes.locale,
        });

      } catch (error) {
        //navigate(ROUTES[state.lang].SIGN_IN);
      }
    };
    **/

    //console.log('USE EFFECT -> ' + state.categories);
    if (!state.categories) {
      loadCategories();
    }

    /**
    const isUserLoggedIn = async () => {
      try {
        const attributes = await Auth.GetUser();
        await loadUser({
          email: attributes.email,
          locale: attributes.locale,
        });
      } catch (error) {
        navigate(ROUTES[state.lang].SIGN_IN);
      }
    };

    isUserLoggedIn();
    **/
  }, []);


  /**
   * Load references and display loading
   */

  if(!state.categories) return <Loading />;

  return (
        <div className="bg-white">
        {loading && <Loading />}
        <Header/>
        <Outlet context={{ setLoading }} />
        <Footer/>
        </div>
  );
}