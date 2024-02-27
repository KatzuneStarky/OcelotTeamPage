import { ModeToggle } from "@/components/mode-toggle";

const AuthLayout = ({ 
    children
  }: { 
    children: React.ReactNode
  }) => {
    return ( 
      <div className="h-full flex flex-col items-center justify-center">
        <div className="absolute w-full flex items-end justify-end mr-10 mt-5 top-0">
          <ModeToggle />
        </div>
        {children}
      </div>
     );
  }
   
  export default AuthLayout;