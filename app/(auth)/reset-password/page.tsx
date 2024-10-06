'use client';

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { z } from "zod";
import { toast } from 'react-hot-toast';

const ChangePasswordPage = () => {
	
	const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState("");
	const router = useRouter();

	const validationSchema = z.object({
		oldPassword: z.string().min(1,"Old password is required"),
		newPassword: z.string().min(1, "New password is required"),
		confirmPassword: z.string().min(1, "Repeat password is required"),

	}).refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
  	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async(e: any) => {
		e.preventDefault()
		       
        const validationResult = validationSchema.safeParse(formData);

        if (!validationResult.success) {
	      	
	      	const fieldErrors = validationResult.error.errors.reduce((acc, curr) => {
	        	acc[curr.path[0]] = curr.message;
	        	return acc;
	      	}, {});
	      	setErrors(fieldErrors);

	    } else {

	    	setErrors({});
	    	const oldPassword = formData.oldPassword;
	    	const newPassword = formData.newPassword;

	    	await fetch('/api/reset-password',{
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body:JSON.stringify({
        		oldPassword, newPassword
        	})
        }).then(async(res) => {
        		const result = await res.json();
            if(result.status == 500){
            	setServerError(result.message);
            }else{
            	toast.success(result.message);
            	window.location.href = "/";
            }
        }).catch((e) => {
            console.log("Create Error")
            console.log(e)
        })
		}
	}

	return (
		<div className="d-flex flex-column flex-root" id="kt_app_root">
		  
		  <div className="d-flex flex-column flex-lg-row flex-column-fluid">
		    
		    <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
		      
		      <div className="d-flex flex-center flex-column flex-lg-row-fluid">
		       
		        <div className="w-lg-500px p-10">
		          
		          <form className="form w-100" id="kt_new_password_form" onSubmit={handleSubmit} >
		           
		            <div className="text-center mb-10">
		              
		              <h1 className="text-dark fw-bolder mb-3">Setup New Password</h1>
		             	
		            </div>
		            {serverError && <p className="errorMessage">{serverError}</p>}
		            <div className="fv-row mb-8" data-kt-password-meter="true">
		              
		              <div className="mb-1">
		               
		                <div className="position-relative mb-3">
		                  <input className="form-control bg-transparent" type="password" placeholder="Old Password"
		                    name="oldPassword"  autoComplete="off" value={formData.oldPassword} onChange={handleChange} />
		                  <span
		                    className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
		                    data-kt-password-meter-control="visibility"
		                  >
		                    <i className="ki-outline ki-eye-slash fs-2" />
		                    <i className="ki-outline ki-eye fs-2 d-none" />
		                  </span>
		                  {errors.oldPassword  && <p className="errorMessage">{errors.oldPassword }</p>}
		                </div>
		              </div>
		            </div>
		            
		            <div className="fv-row mb-8">
		              
		              <input type="password" placeholder="New Password" name="newPassword" autoComplete="off" className="form-control bg-transparent" value={formData.newPassword} onChange={handleChange} />
		             	{errors.newPassword  && <p className="errorMessage">{errors.newPassword }</p>}
		            </div>

		            <div className="fv-row mb-8">
		              
		              <input type="password" placeholder="Repeat Password" name="confirmPassword" autoComplete="off" className="form-control bg-transparent" value={formData.confirmPassword} onChange={handleChange} />
		              {errors.confirmPassword  && <p className="errorMessage">{errors.confirmPassword }</p>}
		             
		            </div>
		            <div className="d-grid mb-10">

		              <button type="submit" id="kt_new_password_submit" className="btn btn-primary">		            
		                <span className="indicator-label">Change</span>		       
		                <span className="indicator-progress">
		                  Please wait...
		                  <span className="spinner-border spinner-border-sm align-middle ms-2" />
		                </span>		                
		              </button>
		            </div>
		            
		          </form>
		          
		        </div>
		        
		      </div>
		      
		    </div>
		    
		    <div
		      className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
		      style={{ backgroundImage: "url(/assets/media/auth/auth-bg.png)" }}
		    >
		      
		      <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
		        
		        <a href="" className="mb-0 mb-lg-12">
		          <img alt="Logo" src="/assets/media/logos/custom-1.png" className="h-60px h-lg-75px" />
		        </a>
		       		        
		        <h1 className="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">
		          Fast, Efficient and Productive
		        </h1>
		        
		        <div className="d-none d-lg-block text-white fs-base text-center">
		          In this kind of post,
		          <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
		            the blogger
		          </a>
		          introduces a person they’ve interviewed
		          <br />
		          and provides some background information about
		          <a href="#" className="opacity-75-hover text-warning fw-bold me-1">
		            the interviewee
		          </a>
		          and their
		          <br />
		          work following this is a transcript of the interview.
		        </div>
		      </div>
		    </div>
		  </div>
		</div>

	);
}

export default ChangePasswordPage;