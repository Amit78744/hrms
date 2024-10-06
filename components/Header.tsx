"use client";
const Header = () => {
	return (
		<>
			<div
			  id="kt_app_header"
			  className="app-header"
			  data-kt-sticky="true"
			  data-kt-sticky-activate="{default: false, lg: true}"
			  data-kt-sticky-name="app-header-sticky"
			  data-kt-sticky-offset="{default: false, lg: '300px'}"
			>
			  
			  <div className="app-container container-fluid d-flex flex-stack" id="kt_app_header_container" >			    
			    <div className="d-flex align-items-center d-block d-lg-none ms-n3" title="Show sidebar menu" >		      
			      <div className="btn btn-icon btn-active-color-primary w-35px h-35px me-2" id="kt_app_sidebar_mobile_toggle" >
			        <i className="ki-outline ki-abstract-14 fs-2" />
			      </div>
			      
			      <a href="#">
			        <img alt="Logo" src="/assets/media/logos/default-small.svg" className="h-30px theme-light-show" />
			        <img alt="Logo" src="/assets/media/logos/default-small-dark.svg" className="h-30px theme-dark-show" />
			      </a>			     
			    </div>
			    
			    <div className="d-flex flex-stack flex-lg-row-fluid" id="kt_app_header_wrapper" >
			        <div
			        className="page-title gap-4 me-3 mb-5 mb-lg-0"
			        data-kt-swapper="true"
			        data-kt-swapper-mode="{default: 'prepend', lg: 'prepend'}"
			        data-kt-swapper-parent="{default: '#kt_app_content_container', lg: '#kt_app_header_wrapper'}" >
			       
			        <h1 className="text-gray-900 fw-bolder m-0">Internal HRMS</h1>
			        
			      </div>
			    </div>
			  </div>
			</div>

		</>
	);
}

export default Header;