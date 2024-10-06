"use client";

import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import { z } from "zod";
import { toast } from 'react-hot-toast';

const EditEmployee = ({params} : {params : {id : string}}) => {

	const id = params.id;
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [status, setStatus] = useState('');
	const [address, setAddress] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState("");
	const router = useRouter();

	const validationSchema = z.object({
		fullName: z.string().trim().min(1,"Full name is required"),
		email: z.string().trim().min(1,"Email is required"),
		phone: z.string().trim().min(1,"Phone number is required"),
		status: z.string().min(1, "Status is required"),
		address: z.string().trim().min(1, "Address is required"),

	});

  	
	const handleSubmit = async(e: any) => {
		e.preventDefault()
       	setIsLoading(true)

       	// Type inference in action
		const validUserData = { 
		    fullName: fullName, 
		    email: email, 
		    phone: phone, 
		    status: status, 
		    address: address
		};
		
        const validationResult = validationSchema.safeParse(validUserData);

        if (!validationResult.success) {
	      	
	      	const fieldErrors = validationResult.error.errors.reduce((acc, curr) => {
	        	acc[curr.path[0]] = curr.message;
	        	return acc;
	      	}, {});
	      	setErrors(fieldErrors);
	      	setIsLoading(false)

	    } else {

	    	setErrors({});
	    	setIsLoading(false)

	    	await fetch('/api/employee',{
	        	method: 'PUT',
	        	headers: {
	        		'Content-Type': 'application/json'
	        	},
	        	body:JSON.stringify({
	        		id, fullName, email, phone, status, address
	        	})
	        }).then(async(res) => {
	        	setIsLoading(false)
        		const result = await res.json();
	            if(result.status == 500){
	            	setServerError(result.message);
	            }else{
					sessionStorage.setItem('toastMessage', result.message);
	            	window.location.href = "/employee";
	            }
	        }).catch((e) => {
	            console.log("Update Error")
	            console.log(e)
	        })
		}
	}

	useEffect(() => {
		getData()
	},[])

	const getData = async () => {
    	const res = await fetch('/api/employee/' + id)
        const json = await res.json()

        if (!json) {
            router.push('/404')
            return
        }

        setFullName(json.employee.name)
        setEmail(json.employee.email)
        setPhone(json.employee.phone)
        setStatus(json.employee.status)
        setAddress(json.employee.address)
    }

	return (
		<>	
			<div className="card">
		        <div className="card-header d-flex justify-content-between align-items-center">
		        	<h2 className="card-title">Edit Employee</h2>		        	
		        </div>
		        <div className="card-body py-4 px-4">		        	
			      	<form className="form w-100" onSubmit={handleSubmit}>
			      		{serverError && <p className="errorMessage">{serverError}</p>}
			      		<div className='row'>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Full Name</label>
								    <input type="text" name="fullName" className="form-control" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
								    {errors.fullName  && <p className="errorMessage">{errors.fullName }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Email</label>
								    <input type="email" name="email" className="form-control" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
								    {errors.email  && <p className="errorMessage">{errors.email }</p>}
								</div>
			      			</div>			      			
			      			<div className='col-md-6'>
			      				<div className="mb-10">
								    <label className="required form-label">Phone Number</label>
								    <input type="text" name="phone" className="form-control" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
								    {errors.phone  && <p className="errorMessage">{errors.phone }</p>}
								</div>
			      			</div>
			      			<div className='col-md-6'>
			      				<div className="mb-10">
				      				<label className="required form-label">Status</label>
				      				<div className="row">
									    <div className='col-md-4'>
									    	<div className="form-check form-check-custom form-check-solid">
											    <input className="form-check-input" type="radio" name="status" value="Active" id="radioActive" checked={status === 'Active'} onChange={(e) => setStatus(e.target.value)}  />
											    <label className="form-check-label" htmlFor="radioActive">
											        Active
											    </label>
											</div>
									    </div>
									    <div className='col-md-4'>
									    	<div className="form-check form-check-custom form-check-solid">
											    <input className="form-check-input" type="radio" name="status" value="Inactive" id="radioInactive" checked={status === 'Inactive'}  onChange={(e) => setStatus(e.target.value)} />
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
								    <textarea className="form-control" name="address" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} defaultValue={address}></textarea>
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

export default EditEmployee;