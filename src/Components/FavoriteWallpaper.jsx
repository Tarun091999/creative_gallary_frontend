import axios from "axios" 
import React , {useState, useEffect} from 'react'
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function FavoriteWallpaers(){

   const navigate = useNavigate();
   const[favoriteWallpaper , setFavoriteWallpaper] = useState() 
   const userid = sessionStorage.getItem("userId");
  


   useEffect(()=>{
      if(userid)
      {
         const url = "https://localhost:7133/favoriteposts/"+userid
         axios.get(url)
         .then(res=>{
            console.log(res.data.result)
            setFavoriteWallpaper(res.data.result)
         })
         .catch(err=>console.log(err))
      }else{
         navigate("/login")
      } 
   },[])


 return (
   
    <>
    <Table striped bordered hover className="w-75 m-auto"> 
      <thead>

         <tr>
         <th> Post Id </th>
         <th> Post</th>
         <th> Post Title</th>
         <th> Post Likes</th>
         </tr>

      </thead>
      <tbody>
      {  favoriteWallpaper && favoriteWallpaper.map((item)=>(
         <tr>
            <td>{item.postId}</td>
            <td><img src={item.postFile} width={100}/></td>
            <td>{item.postTitle}</td>
            <td>{item.postLike}</td>
         </tr>
      ))}

      </tbody>
    </Table>
    
    </>
 )
}