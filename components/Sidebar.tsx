"use client";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
	
	const { data: session } = useSession();
  	const router = useRouter();  	
	return (
		<>
			<div
				id="kt_app_sidebar"
				className="app-sidebar flex-column"
				data-kt-drawer="true"
				data-kt-drawer-name="app-sidebar"
				data-kt-drawer-activate="{default: true, lg: false}"
				data-kt-drawer-overlay="true"
				data-kt-drawer-width="250px"
				data-kt-drawer-direction="start"
				data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
			>
			  {/*begin::Header*/}
			  <div
			    className="app-sidebar-header d-none d-lg-flex px-6 pt-8 pb-4"
			    id="kt_app_sidebar_header"
			  >
			    {/*begin::Toggle*/}
			    <button
			      type="button"
			      data-kt-element="selected"
			      className="btn btn-outline btn-custom btn-flex w-100"
			      data-kt-menu-trigger="click"
			      data-kt-menu-placement="bottom-start"
			      data-kt-menu-offset="0px, -1px"
			    >
			      {/*begin::Logo*/}
			      <span className="d-flex flex-center flex-shrink-0 w-40px me-3">
			        <img
			          alt="Logo"
			          src="/assets/media/logos/default-small.svg"
			          data-kt-element="logo"
			          className="h-30px"
			        />
			      </span>
			      {/*end::Logo*/}
			      {/*begin::Info*/}
			      <span className="d-flex flex-column align-items-start flex-grow-1">
			        <span
			          className="fs-5 fw-bold text-white text-uppercase"
			          data-kt-element="title"
			        >
			          HRM
			        </span>
			        <span
			          className="fs-7 fw-bold text-gray-700 lh-sm"
			          data-kt-element="desc"
			        />
			      </span>
			      {/*end::Info*/}
			     
			    </button>
			    {/*end::Toggle*/}
			  </div>
			  {/*end::Header*/}
			  {/*begin::Navs*/}
			  <div
			    className="app-sidebar-navs flex-column-fluid py-6"
			    id="kt_app_sidebar_navs"
			  >
			    <div
			      id="kt_app_sidebar_navs_wrappers"
			      className="hover-scroll-y my-2"
			      data-kt-scroll="true"
			      data-kt-scroll-activate="true"
			      data-kt-scroll-height="auto"
			      data-kt-scroll-dependencies="#kt_app_sidebar_header, #kt_app_sidebar_footer"
			      data-kt-scroll-wrappers="#kt_app_sidebar_navs"
			      data-kt-scroll-offset="5px"
			    >
			      {/*begin::Quick links*/}
			      <div className="menu menu-rounded menu-column">
			        {/*begin::Menu Item*/}
			        <div className="menu-item">
			          {/*begin::Menu link*/}
			          <Link href={'/'} className="menu-link">
			            {/*begin::Icon*/}
			            <span className="menu-icon">
			              <i className="ki-outline ki-home-2 fs-2" />
			            </span>
			            {/*end::Icon*/}
			            {/*begin::Title*/}
			            <span className="menu-title">Dashboard</span>
			            {/*end::Title*/}
			          </Link>
			          {/*end:::Menu link*/}
			        </div>
			        {/*end::Menu Item*/}
			        {/*begin::Separator*/}
			        <div className="app-sidebar-separator separator" />
			        {/*end::Separator*/}
			        {/*begin::Menu Item*/}
			        <div className="menu-item">
			          {/*begin::Menu link*/}
			          <Link href={'/employee'} className="menu-link">
			            {/*begin::Icon*/}
			            <span className="menu-icon">
			              <i className="ki-outline ki-profile-user fs-2" />
			            </span>
			            {/*end::Icon*/}
			            {/*begin::Title*/}
			            <span className="menu-title">Employee Management</span>
			            {/*end::Title*/}
			          </Link>
			          {/*end:::Menu link*/}
			        </div>
			        {/*end::Menu Item*/}
			        
			      </div>
			      {/*end::Quick links*/}
			      {/*begin::Separator*/}
			      <div className="app-sidebar-separator separator" />
			      {/*end::Separator*/}
			    </div>
			  </div>
			  {/*end::Navs*/}
			  {/*begin::Footer*/}
			  <div
			    className="app-sidebar-footer d-flex flex-stack px-11 pb-10"
			    id="kt_app_sidebar_footer"
			  >
			    {/*begin::User menu*/}
			    <div className="">
			      {/*begin::Menu wrapper*/}
			      <div
			        className="cursor-pointer symbol symbol-circle symbol-40px"
			        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
			        data-kt-menu-overflow="true"
			        data-kt-menu-placement="top-start"
			      >
			        <img src="/assets/media/avatars/300-2.jpg" alt="image" />
			      </div>
			      {/*begin::User account menu*/}
			      <div
			        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
			        data-kt-menu="true"
			      >
			        {/*begin::Menu item*/}
			        <div className="menu-item px-3">
			          <div className="menu-content d-flex align-items-center px-3">
			            {/*begin::Avatar*/}
			            <div className="symbol symbol-50px me-5">
			              <img alt="Logo" src="/assets/media/avatars/300-2.jpg" />
			            </div>
			            {/*end::Avatar*/}
			            {/*begin::Username*/}
			            <div className="d-flex flex-column">
			              <div className="fw-bold d-flex align-items-center fs-5">
			                {session?.user?.name}			                
			              </div>
			              <a
			                href="#"
			                className="fw-semibold text-muted text-hover-primary fs-7"
			              >
			               {session?.user?.email}
			              </a>
			            </div>
			            {/*end::Username*/}
			          </div>
			        </div>
			        {/*end::Menu item*/}
			        {/*begin::Menu separator*/}
			        <div className="separator my-2" />
			        {/*end::Menu separator*/}
			        {/*begin::Menu item*/}
			        <div className="menu-item px-5">
			          <a href="#" className="menu-link px-5">
			            My Profile
			          </a>
			        </div>
			        {/*end::Menu item*/}
			        {/*begin::Menu item*/}
			        <div className="menu-item px-5">
			          <Link href={'/reset-password'} className="menu-link px-5">
			            Change Password
			          </Link>
			        </div>
			        {/*end::Menu item*/}
			      </div>
			      {/*end::User account menu*/}
			      {/*end::Menu wrapper*/}
			    </div>
			    {/*end::User menu*/}
			    {/*begin::Logout*/}
			    <Link href="#" className="btn btn-sm btn-outline btn-flex btn-custom px-3" onClick={() => {signOut({ redirect: false }).then(() => {router.push("/auth"); });}}>
			    	<i className="ki-outline ki-entrance-left fs-2 me-2" />
			    	Logout
			    </Link>
			    
			    {/*end::Logout*/}
			  </div>
			  {/*end::Footer*/}
			</div>
		</>
	);
}

export default Sidebar;