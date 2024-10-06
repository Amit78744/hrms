'use client';
import { getCsrfToken, signIn } from "next-auth/react";
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { z } from "zod";

const SignInPage = () => {
	
	const [formData, setFormData] = useState({ email: "", password: "" });
  	const [errors, setErrors] = useState({});
  	const [serverError, setServerError] = useState("");
	const router = useRouter();

	const signInSchema = z.object({
		email: z.string().email("Email is required"),
		password: z.string().min(1, "Password is required"),
	});

	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement | null;

		if(target)
			setFormData({ ...formData, [target.name]: target.value });
	};

	const handleSubmit = async(e: any) => {
		e.preventDefault()
       
        const validationResult = signInSchema.safeParse(formData);

        if (!validationResult.success) {
	      	
	      	const fieldErrors = validationResult.error.errors.reduce((acc, curr) => {
	        	acc[curr.path[0]] = curr.message;
	        	return acc;
	      	}, {});
	      	setErrors(fieldErrors);

	    } else {

	    	setErrors({});
	    	const email = formData.email;
	    	const password = formData.password;

	        const result = await signIn("credentials", {
		      	redirect: false,
		      	email,
		      	password,
		    });
	  
		    if (result?.error) {
		    	setServerError(result.error);
		     	console.log("Login Failed")    
		    } else {		    	
		      	window.location.href = "/";
		    }
		}
	}

	return (
		<div className="d-flex flex-column flex-root auth-bg" id="kt_app_root">
           	<div className="d-flex flex-column flex-column-fluid flex-lg-row">
           		<div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
							
					<div className="d-flex flex-center flex-lg-start flex-column">
						
						<a href="" className="mb-7">
							<img alt="Logo" src="/assets/media/logos/custom-3.svg" />
						</a>
						
						<h2 className="text-white fw-normal m-0">Branding tools designed for your business</h2>
						
					</div>
							
				</div>
				<div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20">
					<div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20">
						<div className="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20">
							<form className="form w-100" id="kt_sign_in_form" onSubmit={handleSubmit}>
								<div className="text-center mb-11">
								  {/*begin::Title*/}
								  <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
								  {/*end::Title*/}
								</div>
								{serverError && <p className="errorMessage">{serverError}</p>}
								{/*begin::Input group=*/}
								<div className="fv-row mb-8">
									{/*begin::Email*/}
									<input type="text" placeholder="Email" name="email" autoComplete="off" className="form-control bg-transparent" value={formData.email} onChange={handleChange} />
									{errors.email && <p className="errorMessage">{errors.email}</p>}
									{/*end::Email*/}
								</div>
								{/*end::Input group=*/}
								<div className="fv-row mb-3">
									{/*begin::Password*/}
									<input type="password" placeholder="Password" name="password" autoComplete="off" className="form-control bg-transparent" value={formData.password} onChange={handleChange} />
									{errors.password  && <p className="errorMessage">{errors.password }</p>}
									{/*end::Password*/}
								</div>
								{/*end::Input group=*/}

								{/*begin::Wrapper*/}
								<div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
									<div></div>
									{/*begin::Link*/}
									<a href="" className="link-primary">Forgot Password ?</a>
									{/*end::Link*/}
								</div>
								{/*end::Wrapper*/}
								
								{/*begin::Submit button*/}
								<div className="d-grid mb-10">
									<button type="submit" id="kt_sign_in_submit" className="btn btn-primary">
										{/*begin::Indicator label*/}
										<span className="indicator-label">Sign In</span>
										{/*end::Indicator label*/}
										{/*begin::Indicator progress*/}
										<span className="indicator-progress">
										Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2" />
										</span>
										{/*end::Indicator progress*/}
									</button>
								</div>
								{/*end::Submit button*/}
							</form>
						</div>
					</div>
				</div>
           	</div>
        </div> 
	);
}

SignInPage.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};

export default SignInPage;