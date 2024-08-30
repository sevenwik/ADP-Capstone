import { useEffect, useState } from 'react'

export const Login = () => {
    
    const [formState, setFormState] = useState({email: "", password: ""})

    /* useEffect(() => {
        setFormState({})
    }, [{}]); */

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        console.log("in submit")
        console.log(formState)
    }

    return (
        <>
            <h1>Login</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="pass"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show password</label>
              </div>
              <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                Submit
              </button>
            </form>
        </>
    )
}