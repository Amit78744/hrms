"use client";

import React, {useEffect, useState} from 'react';
import DataTable from '@/components/datatable/EmployeeTable';
import Link from 'next/link';

const Employees = () => {

	const [data, setData] = useState([]);
	const initialData = [];

	useEffect(() => {
		getData()
	},[])

	const getData = async () => {
    	const res = await fetch('/api/employee')
        const json = await res.json()
        setData(json.employees)
    }

	return (
		<>	
			<div className="card">
		        <div className="card-header d-flex justify-content-between align-items-center">
		        	<h2 className="card-title">Employee</h2>
		        	<Link href={'/employee/create'} className="btn btn-dark btn-sm">
						<i className="fas fa-plus fs-5"></i> Create
					</Link>
		        </div>
		        <div className="card-body py-4 px-4">		        	
			        <DataTable data={data} />
		        </div>
		    </div>
		</>
	);
}

export default Employees;