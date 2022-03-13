import  SearchOutlinedIcon  from '@mui/icons-material/SearchOutlined'
import React , {useState , useEffect} from 'react'
import SearchBody from './SearchBody'
import styled from "styled-components"
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider'
import { actionTypes } from '../../../reducer'


function SearchPage() {
   const[input , setInput] = useState('');
   const[{user , userInfo} , dispatch] = useStateValue();
   
   const history=useHistory();

   useEffect(() => {
    if (input) {
        dispatch({
            type: actionTypes.SET_SEARCH_INPUT,
            searchInput: input,
        })
        dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/searchPage",
    });
    }
}, [input]);


    return (
        // <div style={{display:'flex',alignItem:'center',width:"100vw",paddingTop:"12px",backgroundColor:"#f1f6fa" , height : "88vh" , flexDirection : 'column'}}>
        //     <Container>
        //         <SearchOutlinedIcon className = "searchIcon"/>
        //         <input type="text" placeholder='Search' 
        //          onChange={(e) => {
        //             setInput(e.target.value)
        //          }}
        //         />
        //     </Container>
        //     <div style={{display:'flex',maxWidth: '1300px',width:"94vw"}}>
            <SearchBody/>
        //     </div>
        // </div>
    )
};

const Container = styled.div`
 background-color: #fff;
    width : 92%;
    border-radius: 20px;
    padding : 5px;
    display: flex;
    margin-left : 7px;
    margin-bottom : 10px;

 @media(min-width : 500px){
     display : none;
 }

 input{
    border:0px;
    outline-width:0px;
    width : 94%;
}
 .searchIcon{
     color : gray !important;
 }`

export default SearchPage
