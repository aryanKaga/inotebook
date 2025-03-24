import './Navigation.css';
import { IoSearchOutline, IoHomeOutline, IoFolderOpenOutline, IoPieChartOutline  } from "react-icons/io5";
import {CgAddR } from "react-icons/cg"
import { crudFunctions } from './blackboard/blackboard_backend/crud_file';
import { useAppService } from './blackboard/customHooks/appHook';
import { canvasInfo } from './blackboard/globalTool';
function Navigation() {
    const {setAppService}=useAppService();
    return (
        <nav id="navbar">
            <ul className="navbar-items flexbox-col">
                
                
                <li className="navbar-item flexbox-left"
                    onClick={()=>{
                        setAppService('connection');
                    }}
                >
                    <a className="navbar-item-inner flexbox-left" href="#">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <IoSearchOutline />
                        </div>
                        <span className="link-text">Search</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" href="#">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <IoHomeOutline />
                        </div>
                        <span className="link-text">Home</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" onClick={()=>{
                        crudFunctions.importFiles({setAppService});
                    }}>
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <IoFolderOpenOutline />
                        </div>
                        <span className="link-text">Files</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left">
                    <a className="navbar-item-inner flexbox-left" onClick={()=>{
                        canvasInfo.title='';
                        canvasInfo.save([]);
                        setAppService('blackboard')}}>
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <CgAddR />
                        </div>
                        <span className="link-text">Create</span>
                    </a>
                </li>
                <li className="navbar-item flexbox-left" id="dashboard">
                    <a className="navbar-item-inner flexbox-left" href="#">
                        <div className="navbar-item-inner-icon-wrapper flexbox">
                            <IoPieChartOutline />
                        </div>
                        <span className="link-text">Dashboard</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}



export default Navigation;
