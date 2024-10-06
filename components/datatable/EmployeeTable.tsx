import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface TableProps {
	data: any[];
}

const EmployeeTable: React.FC<TableProps> = ({ data }) => {

  	const [currentPage, setCurrentPage] = useState(1);
  	const pageSize = 3;
  	
	// Pagination
  	const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  	const totalPages = Math.ceil(data.length / pageSize);

  	const handleDelete = async (id: number) => {
        await fetch('/api/employee?id=' + id, {
            method: 'DELETE'
        }).then(async(res) => {
	    	
			const result = await res.json();
	        toast.success(result.message);
        	window.location.href = "/employee";
	    }).catch((e) => {
	        console.log("Update Error")
	        console.log(e)
	    })        
    }

  	return (
	    <div className='table-responsive'>
	      	<table className="table table-striped gy-7 gs-7">
		        <thead>
		          	<tr className='fw-semibold fs-6 text-gray-800 border-bottom border-gray-200'>
			            <th>Id</th>
			            <th>Name</th>
			            <th>Email</th>
			            <th>Phone</th>
			            <th>Status</th>
			            <th style={{ width: '200px' }}>Action</th>
		          	</tr>
		        </thead>
	        	<tbody>
	          		{paginatedData.map((item, index) => (
	            		<tr key={index}>
							<td>{index+1}</td>
							<td>{item.name}</td>
							<td>{item.email}</td>
							<td>{item.phone}</td>
							<td> 
								<span className={ item.status === 'Active' ? 'badge bg-success text-white' : 'badge bg-danger text-white' }>
					              {item.status}
					            </span>
					        </td>
							<td>
								<Link href={`/employee/edit/${item.id}`} className="btn btn-sm btn-icon btn-dark me-2">
									<i className="fas fa-edit fs-5"></i>
								</Link>
								<button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-icon btn-danger">
									<i className="fas fa-trash fs-5"></i>
								</button>
							</td>
	            		</tr>
	          		))}
	        	</tbody>
	      	</table>
	      	<div className='float-end mt-5'>
	        	<button className='btn btn-dark btn-sm' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
	          		Previous
	        	</button>
	        	<span className='ps-5 pe-5'>
	          		Page {currentPage} of {totalPages}
        		</span>
	        	<button className='btn btn-dark btn-sm' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
	          		Next
	        	</button>
	      	</div>
	    </div>
	);
}


export default EmployeeTable;