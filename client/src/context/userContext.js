import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext({});


// export const useUserContext = () => {
//     return useContext(UserContext); 
//   };
  
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState('')
 
  return <UserContext.Provider value={{userInfo, setUserInfo, token, setToken}}  >
      {children}
    </UserContext.Provider>
    }