import { createFileRoute, useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const nav=useNavigate();
  const data:any=useSearch({from:"/"})
  console.log(data)
 
  Object.keys(data).forEach((k:any)=>console.log("key: ", k, "value: ",data[k]))
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>   
         <div>
       
           <Button onClick={()=>{
nav({to:"/", search:{one:1,two:2}})
          }}>
            
          Actanos
          
        </Button>
      </div>

    </div>
  )
}
