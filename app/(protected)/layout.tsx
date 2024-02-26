import UserButton from "@/components/auth/user-button"

const AdminLayout = ({
    children
}: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
        <UserButton />
    </div>
  )
}

export default AdminLayout