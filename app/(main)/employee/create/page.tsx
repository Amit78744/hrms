"use client";

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import { z } from "zod";
import { toast } from 'react-hot-toast';

const CreateEmployee = () => {

	const [formData, setFormData] = useState({ 
		fullName: "", 
		email: "", 
		password: "", 
		cpassword: "", 
		phone: "", 
		status: "", 
		address: ""
	});
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; cpassword?: string; phone?: string; status?: string; address?: string; }>({});
	const [serverError, setServerError] = useState("");
	const router = useRouter();

	const validationSchema = z.object({
		fullName: z.string().trim().min(1,"Full name is required"),
		email: z.string().trim().min(1,"Email is required"),
		phone: z.string().trim().min(1,"Phone number is required"),
		password: z.string().trim().min(1, "Password is required"),
		cpassword: z.string().trim().min(1, "Confirm password is required"),
		status: z.string().min(1, "Status is required"),
		address: z.string().trim().min(1, "Address is required"),

	}).refine((data) => data.password === data.cpassword, {
      	message: "Passwords don't match",
      	path: ["cpassword"],
  	});

  	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	

	const handleSubmit = async(e: any) => {
		e.preventDefault()
       	setIsLoading(true)

        const validationResult = validationSchema.safeParse(formData);

        if (!validationResult.success) {
	      	
	      	const fieldErrors = validationResult.error.errors.reduce((acc: { [key: string]: string }, curr) => {
	        	acc[curr.path[0]] = curr.message;
	        	return acc;
	      	}, {});
	      	setErrors(fieldErrors);
	      	setIsLoading(false)

	    } else {

	    	setErrors({});
	    	setIsLoading(true)
	    	const fullName = formData.fullName;
	    	const email = formData.email;
	    	const phone = formData.phone;
	    	const password = formData.password;
	    	const status = formData.status;
	    	const address = formData.address;

	    	await fetch('/api/employee',{
	        	method: 'POST',
	        	headers: {
	        		'Content-Type': 'application/json'
	        	},
	        	body:JSON.stringify({
	        		fullName, email, phone, password, status, address
	        	})
	        }).then(async(res) => {
	        	setIsLoading(false)
        		const result = await res.json();
	            if(result.status == 500){
	            	setServerError(result.message);
	            }else{
	            	toast.success(result.message);
	            	window.location.href = "/employee";
	            }
	        }).catch((e) => {
	            console.log("Create Error")
	            console.log(e)
	        })
		}
	}

	return (
		<>	
			<div className="card">
		        <div className="card-header d-flex justify-content-between align-items-center">
		        	<h2 className="card-title">Create Employee</h2>		        	
		        </div>
		        <div className="card-body py-4 px-4">		        	
			      	<form className="form w-100" onSubmit={handleSubmit}>
			      		{serverError && <p className="errorMessage">{serverError}</p>}
			      		<div className='row'>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Full Name</label>
								    <input type="text" name="fullName" className="form-control" placeholder="Enter Full Name" value={formData.fullName} onChange={handleChange} />
								    {errors.fullName  && <p className="errorMessage">{errors.fullName }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Email</label>
								    <input type="email" name="email" className="form-control" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
								    {errors.email  && <p className="errorMessage">{errors.email }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Password</label>
								    <input type="password" name="password" className="form-control" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
								    {errors.password  && <p className="errorMessage">{errors.password }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Confirm Password</label>
								    <input type="password" name="cpassword" className="form-control" placeholder="Enter Confirm Password" value={formData.cpassword} onChange={handleChange} />
								    {errors.cpassword  && <p className="errorMessage">{errors.cpassword }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Phone Number</label>
								    <input type="text" name="phone" className="form-control" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} />
								    {errors.phone  && <p className="errorMessage">{errors.phone }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
				      				<label className="required form-label">Status</label>
				      				<div className="row">
									    <div className='col-md-4'>
									    	<div className="form-check form-check-custom form-check-solid">
											    <input className="form-check-input" type="radio" name="status" value="Active" id="radioActive" onChange={handleChange} />
											    <label className="form-check-label" htmlFor="radioActive">
											        Active
											    </label>
											</div>
									    </div>
									    <div className='col-md-4'>
									    	<div className="form-check form-check-custom form-check-solid">
											    <input className="form-check-input" type="radio" name="status" value="Inactive" id="radioInactive" onChange={handleChange} />
											    <label className="form-check-label" htmlFor="radioInactive">
											        Inactive
											    </label>
											</div>
									    </div>
									</div>
									{errors.status  && <p className="errorMessage">{errors.status }</p>}
								</div>
			      			</div>
			      			<div className='col-md-12'>
			      				<div className="mb-10">
								    <label className="required form-label">Address</label>
								    <textarea className="form-control" name="address" placeholder="Enter Address" onChange={handleChange} defaultValue={formData.address}></textarea>
								    {errors.address  && <p className="errorMessage">{errors.address }</p>}
								</div>
			      			</div>
			      		</div>

			      		<button className='btn btn-dark me-5' disabled={isLoading}>{isLoading ? 'Loading ...' : 'Save'}</button>
			      		<Link href={'/employee'} className='btn btn-danger'>Cancel</Link>
			      	</form>
		        </div>
		    </div>
		</>
	);
}

export default CreateEmployee;