import UserButton from "@/components/auth/user-button"
import Navbar from "./_components/admin-navbar"

const AdminLayout = ({
    children
}: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
        <Navbar />
        <div className="mt-20">
          {children}
        </div>
    </div>
  )
}

export default AdminLayout