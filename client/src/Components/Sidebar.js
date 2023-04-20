import '../CSS/Sidebar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export const Sidebar = () => {
    return(
        <div className="sidebar">

            <div className='menu'><MenuIcon/></div>

            <div className='out'><ExitToAppIcon/></div>

        </div>
    )
}