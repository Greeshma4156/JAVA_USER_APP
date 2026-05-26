import { useLocation } from "react-router"

function User() {

  let {state}=useLocation();

  console.log(state)

  return (
    <div>
      <p>{state?.name}</p>
      <p>{state?.email}</p>
      <p>{state?.dateOfBirth}</p>
      <p>{state?.mobileNumber}</p>
    </div>
  )
}

export default User
