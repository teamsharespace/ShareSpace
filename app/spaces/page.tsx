import Navbar from "@/components/navbar"
import LeftSideSmallNav from "../../components/spacecomp/leftsidesmallnav"
import RightSideSmallNav from "../../components/spacecomp/RightSideSmallNav"
import Main from "@/components/spacecomp/main"
export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full fixed top-24 left-0 right-0 bg-white z-10"><LeftSideSmallNav/><RightSideSmallNav/></div>
      <hr />
      <div>
        <Main/>
      </div>
    </div>
  )
}
