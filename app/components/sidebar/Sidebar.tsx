import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

async function Sidebar({children}:{
    children:React.ReactNode
}){
    const currentuser = await getCurrentUser();
    return(
        <div className="h-full">
          <DesktopSidebar currentuser={currentuser!}/>
          <MobileFooter/>
            <main className="lg:pl-20 h-full">
             {children}
            </main>
        </div>
    )
}

export default Sidebar