import React from "react";


export default function Paged({ recipesPerPage, allRecipes, paginado }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
     
     {pages.length <= 1 ? 
            <></> :
            <nav >
               
                <ul  >
                
                    {pages?.map(p =>(
                      
                            <button     key={p}  onClick={() => paginado(p)} style={{width:"50px", backgroundColor:"lightgreen"}}>{p}</button>
                      
                    ))}
                     
                </ul>
              
            </nav>
            }  
    </div>
 
 
 
 
 
 
 
 );
}



// // <nav>
// <ul>
// {pageNumber &&
//   pageNumber.map((p) => (
//     <button key={p} onClick={() => paginado(p)}>
//       {p}
//     </button>
//   ))}
// </ul>
// </nav>
// //