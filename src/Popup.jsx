import { useEffect, useState } from "react";


import { RiErrorWarningLine, RiCloseFill } from "react-icons/ri";
import { VscWarning } from "react-icons/vsc";
import { BiMessageCheck } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
export default function PopUp(props) {
const {state, handleClick,name} =props
console.log(props)
  return (
    <div>

        {state ? <div >
            <div>
        <div className="justify-center bg-modal items-center scale-up-hor-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none sm:w-[100%] sm:px-3 " >
          <div className="popup-box">
            <div className={`${props.width === "sm" ? "w-[30%] " : "w-[30%]"}  ${props.width === "md" ? "w-[50%] " : ""} ${props.width === "lg" ? "w-[70%] " : ""} box   relative`}>
              <div className={`  ${props.type == "info" ? "bg-[#3988d7]" : ""} ${props.type == "success" ? "bg-[#559b24]" : ""} ${props.type == "warning" ? "bg-[#c47c16]" : ""}
              
              ${props.type == "error" ? " bg-[#db484f]   " : ""}  bg-[#3988d7] py-2 px-4 heading  text-h4 flex justify-start `}>
                {props.type == "error" ? <RiErrorWarningLine className="text-white  text-[26px] mt-1" /> : null}
                {props.type == "warning" ? <VscWarning className="text-white  text-[26px] mt-1" /> : null}
                {props.type == "success" ? <BiMessageCheck className="text-white  text-[26px] mt-1.5" /> : null}
                {props.type == "info" ? <FiInfo className="text-white  text-[26px] mt-1" /> : null}
                {props.type === undefined || props.type === null ? <FiInfo className="text-white  text-[26px] mt-1" /> : null }
                <p className="text-white mx-3 text-h3 tracking-wide heading title pt-[1px]"> {props.title ?? props.type}</p>
              </div>

              {props.actionbar ? null :<div onClick={handleClick} className="absolute top-4 right-4 group rounded-md">
                <div className={`  ${props.type == "success" ? " hover:bg-[#559b24]" : ""} ${props.type == "warning" ? " hover:bg-[#c47c16]" : ""} ${props.type == "error" ? " hover:bg-[#e33b44]" : ""} ${props.type == "info" ? "hover:bg-[#3988d7] " : ""} h-[20px] w-[20px] cursor-pointer duration-300  bg-[#fff] flex justify-center items-center  rounded-sm hover:bg-[#3988d7] `}>
                  <RiCloseFill className="text-text-color group-hover:text-white" />
                </div>
              </div> }
              

              <div className={` ${props.width === "sm" ? "h-[30vh] overflow-auto " : ""} ${props.width === "md" ? "h-[50vh] overflow-auto " : ""} ${props.width === "lg" ? " overflow-auto" : ""}  `}>
                <div>

                {/* <p className="w-[80%]  mx-auto text-text-color pt-6 text-center text-base pb-6"> {props.message}</p> */}
                {props.children}
                {props.actionbar ? <div className=" flex justify-end px-2 pb-2">
                <button    onClick={handleClick} className="bg-dashboard cursor-pointer py-1  text-tiny hover:bg-dashboard-hover px-8 text-white">
                    Cancel
                  </button>
                  <button className="bg-dashboard cursor-pointer mx-2 text-tiny py-1 hover:bg-dashboard-hover px-8 text-white">
                  Save
                  </button>
               
                  </div>:null}
                <div></div>
                </div>
             

              </div>


         
            </div>
          </div>
        </div>
      </div> 
        </div> : null}
        
    </div>
  )
}